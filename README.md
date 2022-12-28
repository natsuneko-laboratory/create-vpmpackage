# @natsuneko-laboratory/create-vpmpackage

Create VPMPackage without Unity and additional instructions in GitHub Actions

## Properties

| Property   | Type       | Required                            | Description                                          |
| ---------- | ---------- | ----------------------------------- | ---------------------------------------------------- |
| `package`  | `string`   | No (default: `null`) \*             | package.json for packaging                           |
| `packages` | `string[]` | No (default: `null`) \*             | array of package.json for packaging                  |
| `root`     | `string`   | No (default: `.`)                   | root directory                                       |
| `output`   | `string`   | Yes if `meta` or `package` provided | output filename such as `Neko.unitypackage`          |
| `outputs`  | `string[]` | Yes if `packages` provided          | array of output filename such as `Neko.unitypackage` |

<small>\* specify one of `meta`, `package`, or `packages`</small>

### using `package`

```yaml
name: "Release by Tag"

on:
  push:
    tags:
      - v\d+\.\d+\.\d+
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          lfs: true

      - run: |
          mkdir ./dist

      - uses: natsuneko-laboratory/create-vpmpackage@v1
        with:
          package: Assets/NatsunekoLaboratory/Package/package.json
          output: dist/Package.zip
```

### using `packages`

```yaml
name: "Release by Tag"

on:
  push:
    tags:
      - v\d+\.\d+\.\d+
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          lfs: true

      - run: |
          mkdir ./dist

      - uses: natsuneko-laboratory/create-vpmpackage@v1.0.0
        with:
          packages: |
            Assets/NatsunekoLaboratory/Package1/package.json
            Assets/NatsunekoLaboratory/Package2/package.json
          outputs: |
            dist/Package1.zip
            dist/Package2.zip
```

## License

MIT by [@6jz](https://twitter.com/6jz)
