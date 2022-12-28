"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOutputsInput = exports.getOutputInput = exports.getPackagesInput = exports.getPackageInput = void 0;
const core_1 = require("@actions/core");
function getPackageInput() {
    return (0, core_1.getInput)("package", { required: false });
}
exports.getPackageInput = getPackageInput;
function getPackagesInput() {
    return (0, core_1.getMultilineInput)("packages", { required: false });
}
exports.getPackagesInput = getPackagesInput;
function getOutputInput() {
    return (0, core_1.getInput)("output", { required: false });
}
exports.getOutputInput = getOutputInput;
function getOutputsInput() {
    return (0, core_1.getMultilineInput)("outputs", { required: false });
}
exports.getOutputsInput = getOutputsInput;
