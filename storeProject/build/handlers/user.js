"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenCheck = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.UsersStore();
const secret_code = process.env.TOKEN_SECRET;
const create = async (req, res) => {
    try {
        const user = {
            // id:req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            password: req.body.password
        };
        let newOne = await store.create(user);
        const newOneData = jsonwebtoken_1.default.sign({ newOne }, secret_code);
        res.json({ newOneData });
    }
    catch (err) {
        res.json(err);
        res.status(400);
    }
};
const index = async (req, res) => {
    try {
        const shower = await store.index();
        res.json(shower);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    const shower = await store.show(req.body.id);
    res.json(shower);
};
const remove = async (req, res) => {
    const removed = await store.delete(req.body.id);
    res.json(removed);
};
const authenticator = async (req, res) => {
    try {
        const usrnm = req.body.user_name;
        const pswrd = req.body.password;
        const checked = store.authenticate(usrnm, pswrd);
        if (!checked) {
            res.send("invalid credentials");
            res.status(400);
        }
        else {
            const newOneData = jsonwebtoken_1.default.sign({ checked }, secret_code);
            res.json(newOneData);
        }
    }
    catch (err) {
        res.json(err);
        res.status(400);
    }
};
function tokenCheck(req, res, next) {
    try {
        const temp = req.headers.authorization?.split(" ")[1];
        jsonwebtoken_1.default.verify(temp, secret_code);
        next();
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
}
exports.tokenCheck = tokenCheck;
const userRouter = (app) => {
    app.get("/users", tokenCheck, index);
    app.post("/users", create);
    app.get("/users/:id", tokenCheck, show);
    app.post("/users/authenticate", authenticator);
};
exports.default = userRouter;
