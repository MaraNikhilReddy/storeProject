"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const user_1 = require("./user");
const store = new order_1.orderStore();
const index = async (req, res) => {
    try {
        const data = await store.index();
        res.json(data);
    }
    catch (err) {
        res.json(err);
        res.status(400);
    }
};
const show = async (req, res) => {
    try {
        const param = req.body.id;
        const shower = await store.show(param);
        res.json(shower);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const data = {
            // id:1,
            quantity: req.body.quantity,
            user_id: req.body.user_id,
            status: req.body.status,
        };
        const newOne = await store.create(data);
        res.json(newOne);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const OrderRouter = (app) => {
    app.get("/orders/:id", show);
    app.get("/orders", index);
    app.post("/orders", user_1.tokenCheck, create);
};
exports.default = OrderRouter;
