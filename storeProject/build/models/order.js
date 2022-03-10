"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStore = void 0;
const database_1 = __importDefault(require("../database"));
class orderStore {
    async index() {
        try {
            const connect = await database_1.default.connect();
            const sql = 'SELECT * FROM Orders';
            const res = await connect.query(sql);
            connect.release();
            return res.rows;
        }
        catch (err) {
            throw new Error(`error was ${err}`);
        }
    }
    async show(id) {
        try {
            const connect = await database_1.default.connect();
            const sql = `SELECT * FROM Orders WHERE id=${id}`;
            const res = await connect.query(sql);
            connect.release();
            return res.rows;
        }
        catch (err) {
            throw new Error(`error was ${err}`);
        }
    }
    async create(data) {
        try {
            const connect = await database_1.default.connect();
            const sql = `INSERT INTO Orders (quantity, user_id, status) VALUES (${data.quantity}, ${data.user_id}, ${data.status})`;
            const res = await connect.query(sql);
            connect.release();
            return res.rows[0];
        }
        catch (err) {
            throw new Error(`error was ${err}`);
        }
    }
    // async userOrders(id:string):Promise<order[]>{
    // }
    async delete(id) {
        try {
            const connect = await database_1.default.connect();
            const sql = `DELETE FROM Orders WHERE id=${id}`;
            const res = await connect.query(sql);
            connect.release();
            return res.rows;
        }
        catch (err) {
            throw new Error(`error is ${err}`);
        }
    }
}
exports.orderStore = orderStore;
