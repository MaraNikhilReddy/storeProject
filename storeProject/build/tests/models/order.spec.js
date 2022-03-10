"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const store = new order_1.orderStore();
describe("order table", () => {
    const test1 = {
        quantity: 6,
        user_id: 1,
        status: "active",
    };
    it("check create", async () => {
        const newOne = await store.create(test1);
        const data = {
            quantity: newOne.quantity,
            user_id: newOne.user_id,
            status: newOne.status,
        };
        expect(data).toEqual(test1);
    });
    it("check function", () => {
        expect(store.index).toBeDefined();
    });
    it("check index", async () => {
        const temp = await store.index();
        const test1 = {
            quantity: 6,
            user_id: 1,
            status: "active",
        };
        expect(temp[0]).toEqual(test1);
    });
});
