"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageInput = getPackageInput;
exports.getPackagesInput = getPackagesInput;
exports.getOutputInput = getOutputInput;
exports.getOutputsInput = getOutputsInput;
const core_1 = require("@actions/core");
function getPackageInput() {
    return (0, core_1.getInput)("package", { required: false });
}
function getPackagesInput() {
    return (0, core_1.getMultilineInput)("packages", { required: false });
}
function getOutputInput() {
    return (0, core_1.getInput)("output", { required: false });
}
function getOutputsInput() {
    return (0, core_1.getMultilineInput)("outputs", { required: false });
}
