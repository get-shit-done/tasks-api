"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTodo = exports.deleteTodo = exports.updateTodo = exports.getTodo = exports.getTodos = exports.handleBadBody = exports.handleBadId = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
const todos = JSON.parse(fs_1.default.readFileSync(`${utils_1.__dirname}/src/data/todos.json`, 'utf-8'));
exports.handleBadId = (req, res, next, id) => {
    const selectedTodo = todos.find(x => x.id === id);
    if (!selectedTodo) {
        return utils_1.failure({ statusCode: 404, res });
    }
    next();
};
exports.handleBadBody = (req, res, next) => {
    if (!req.body.todoName || req.body.isDone === undefined) {
        return utils_1.failure({ statusCode: 400, res });
    }
    next();
};
exports.getTodos = (req, res) => {
    res.send({
        status: 'success',
        data: {
            todos,
        },
    });
};
exports.getTodo = (req, res) => {
    const todo = todos.find(x => x.id === req.params.id);
    utils_1.success({ statusCode: 200, data: todo, res });
};
exports.updateTodo = (req, res) => {
    const todo = todos.find(x => x.id === req.params.id);
    const updatedTodo = todo ? Object.assign(Object.assign({}, todo), req.body) : undefined;
    utils_1.success({ statusCode: 200, data: updatedTodo, res });
};
exports.deleteTodo = (req, res) => {
    utils_1.success({ statusCode: 204, res });
};
exports.addTodo = (req, res) => {
    const newTodo = Object.assign({ id: uuid_1.v4() }, req.body);
    const updatedTodos = [...todos, newTodo];
    fs_1.default.writeFile(`${utils_1.__dirname}/src/data/todos.json`, JSON.stringify(updatedTodos), () => {
        utils_1.success({ statusCode: 201, data: newTodo, res });
    });
};
//# sourceMappingURL=todosController.js.map