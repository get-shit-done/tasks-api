"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.failure = exports.success = exports.determineResponse = exports.__dirname = void 0;
const path_1 = __importDefault(require("path"));
exports.__dirname = path_1.default.resolve(); // if set to type: module - dirname is undefined
exports.determineResponse = ({ statusString, statusCode, data = {}, res }) => res.status(statusCode).json({
    status: statusString,
    data,
});
exports.success = ({ statusCode, data, res }) => exports.determineResponse({ statusString: 'success', statusCode, data, res });
exports.failure = ({ statusCode, data, res }) => exports.determineResponse({ statusString: 'fail', statusCode, data, res });
//# sourceMappingURL=utils.js.map