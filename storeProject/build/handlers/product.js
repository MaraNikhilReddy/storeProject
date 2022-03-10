"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const user_1 = require("./user");
const store = new product_1.productStore();
const shoow = async (req, res) => {
    try {
        const temp = req.body.id;
        const shower = await store.show(temp);
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
            name: req.body.name,
            price: req.body.price
        };
        const nowOne = await store.create(data);
        res.json(nowOne);
    }
    catch (err) {
        res.json(err);
        res.status(400);
    }
};
const index = async (req, res) => {
    try {
        const data = store.index();
        res.json(data);
    }
    catch (err) {
        res.json(err);
        res.status(400);
    }
};
const productRouter = (app) => {
    app.get("/product/:id", shoow);
    app.post("/product", user_1.tokenCheck, create);
    app.get("/product", index);
};
exports.default = productRouter;
