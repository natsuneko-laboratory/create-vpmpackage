"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const core_1 = require("@actions/core");
const vpmpackage_1 = require("@natsuneko-laboratory/vpmpackage");
const input_1 = require("./input");
function isExistsFileAsync(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        return node_fs_1.default.existsSync(filepath);
    });
}
function readPackageJson(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            node_fs_1.default.readFile(filepath, { encoding: "utf-8" }, (err, data) => {
                if (err)
                    return reject(err);
                return resolve(JSON.parse(data));
            });
        });
    });
}
function runForPackageInput(args) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const pkg = (_a = args === null || args === void 0 ? void 0 : args.pkg) !== null && _a !== void 0 ? _a : (0, input_1.getPackageInput)();
        const out = (_b = args === null || args === void 0 ? void 0 : args.out) !== null && _b !== void 0 ? _b : (0, input_1.getOutputInput)();
        const isExists = yield isExistsFileAsync(pkg);
        if (!isExists)
            throw new Error("the specified file is not found");
        const json = yield readPackageJson(pkg);
        const { name } = json;
        try {
            yield (0, vpmpackage_1.archive)({
                name,
                package: pkg,
                dist: out,
            });
        }
        catch (e) {
            throw new Error("failed to package VPM package");
        }
    });
}
function runForPackagesInput() {
    return __awaiter(this, void 0, void 0, function* () {
        const packages = (0, input_1.getPackagesInput)();
        const outputs = (0, input_1.getOutputsInput)();
        if (packages.length !== outputs.length)
            throw new Error("the number of elements in packages and outputs must be match");
        for (let i = 0; i < packages.length; i += 1) {
            const pkg = packages[i];
            const out = outputs[i];
            // eslint-disable-next-line no-await-in-loop
            yield runForPackageInput({ pkg, out });
        }
    });
}
function getInputType() {
    return __awaiter(this, void 0, void 0, function* () {
        const pkg = (0, input_1.getPackageInput)();
        if (pkg) {
            return "package";
        }
        const packages = (0, input_1.getPackagesInput)();
        if (packages) {
            return "packages";
        }
        throw new Error("@natsuneko-laboratory/create-vpmpackage requires one of meta, package or packages input");
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const type = yield getInputType();
            switch (type) {
                case "package":
                    yield runForPackageInput();
                    break;
                case "packages":
                    yield runForPackagesInput();
                    break;
                default:
                    throw new Error(`Unknown type: ${type}`);
            }
        }
        catch (err) {
            if (err instanceof Error)
                (0, core_1.setFailed)(err.message);
        }
    });
}
main();
