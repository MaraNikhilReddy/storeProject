"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const store = new user_1.UsersStore();
// console.log("in testing phase");
describe("user table", () => {
    const test1 = {
        first_name: "mara",
        last_name: "nikhil",
        user_name: "mara_nikhil",
        password: "1234"
    };
    it("create user", async () => {
        const expected_ans = {
            id: 1,
            first_name: "mara",
            last_name: "nikhil",
            user_name: "mara_nikhil",
        };
        const data = await store.create(test1);
        const returned_ans = {
            id: data.last_name,
            first_name: data.first_name,
            last_name: data.last_name,
            user_name: data.user_name
        };
        expect(data).toEqual(expected_ans);
    });
});
