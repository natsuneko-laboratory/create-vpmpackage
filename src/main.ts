import { setFailed } from "@actions/core";
import { archive } from "@natsuneko-laboratory/vpmpackage";
import fs from "fs";

import {
  getOutputInput,
  getOutputsInput,
  getPackageInput,
  getPackagesInput,
} from "./input";

async function isExistsFileAsync(filepath: string): Promise<boolean> {
  return fs.existsSync(filepath);
}

async function readPackageJson(filepath: string): Promise<{ name: string }> {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, { encoding: "utf-8" }, (err, data) => {
      if (err) return reject(err);
      return resolve(JSON.parse(data));
    });
  });
}

async function runForPackageInput(args?: { pkg: string; out: string }) {
  const pkg = args?.pkg ?? getPackageInput();
  const out = args?.out ?? getOutputInput();

  const isExists = await isExistsFileAsync(pkg);
  if (!isExists) throw new Error("the specified file is not found");

  const json = await readPackageJson(pkg);
  const { name } = json;

  try {
    await archive({
      name,
      package: pkg,
      dist: out,
    });
  } catch (e) {
    throw new Error("failed to package VPM package");
  }
}

async function runForPackagesInput() {
  const packages = getPackagesInput();
  const outputs = getOutputsInput();

  if (packages.length !== outputs.length)
    throw new Error(
      "the number of elements in packages and outputs must be match"
    );

  for (let i = 0; i < packages.length; i += 1) {
    const pkg = packages[i];
    const out = outputs[i];

    // eslint-disable-next-line no-await-in-loop
    await runForPackageInput({ pkg, out });
  }
}

async function getInputType(): Promise<"package" | "packages"> {
  const pkg = getPackageInput();
  if (pkg) {
    return "package";
  }

  const packages = getPackagesInput();
  if (packages) {
    return "packages";
  }

  throw new Error(
    "@natsuneko-laboratory/create-vpmpackage requires one of meta, package or packages input"
  );
}

async function main() {
  try {
    const type = await getInputType();

    switch (type) {
      case "package":
        await runForPackageInput();
        break;

      case "packages":
        await runForPackagesInput();
        break;

      default:
        throw new Error(`Unknown type: ${type as { type: "__invalid__" }}`);
    }
  } catch (err) {
    if (err instanceof Error) setFailed(err.message);
  }
}

main();
