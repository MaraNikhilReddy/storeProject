"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStore = void 0;
const database_1 = __importDefault(require("../database"));
class productStore {
    async index() {
        try {
            const connect = await database_1.default.connect();
            const sql = 'SELECT * FROM Product';
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
            const sql = `SELECT * FROM Product WHERE id=${id}`;
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
            const sql = `INSERT INTO Product (name, price) VALUES (${data.name}, ${data.price})`;
            const res = await connect.query(sql);
            connect.release();
            return res.rows;
        }
        catch (err) {
            throw new Error(`error was ${err}`);
        }
    }
    async delete(id) {
        try {
            const connect = await database_1.default.connect();
            const sql = `DELETE FROM Product WHERE id=${id}`;
            const res = await connect.query(sql);
            connect.release();
            return res.rows;
        }
        catch (err) {
            throw new Error(`error is ${err}`);
        }
    }
}
exports.productStore = productStore;
