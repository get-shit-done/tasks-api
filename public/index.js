"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config.env' }); // TODO: should go in server file, but not working (perhaps module)
const todos_1 = require("./src/routes/todos");
const groups_1 = require("./src/routes/groups");
exports.app = express_1.default();
if (process.env.NODE_ENV === 'development') {
    exports.app.use(morgan_1.default('dev'));
}
exports.app.use(body_parser_1.default.json());
exports.app.use('/api/v1/todos', todos_1.router);
exports.app.use('/api/v1/groups', groups_1.router);
//# sourceMappingURL=index.js.map