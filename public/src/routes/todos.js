"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const todosController_1 = require("../controllers/todosController");
exports.router = express_1.default.Router();
exports.router.param('id', todosController_1.handleBadId);
exports.router.route('/').get(todosController_1.getTodos).post(todosController_1.handleBadBody, todosController_1.addTodo);
exports.router.route('/:id').get(todosController_1.getTodo).patch(todosController_1.updateTodo).delete(todosController_1.deleteTodo);
//# sourceMappingURL=todos.js.map