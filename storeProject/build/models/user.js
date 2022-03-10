"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV, POSTGRES_TEST, BCRYPT_PASSWORD, SALT_ROUNDS, } = process.env;
class UsersStore {
    async index() {
        try {
            const connect = await database_1.default.connect();
            const sql = 'SELECT * FROM Users';
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
            const hash = bcrypt_1.default.hashSync(data.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
            const connect = await database_1.default.connect();
            const sql = `INSERT INTO Users (first_name, last_name, user_name, password) VALUES (${data.first_name}, ${data.last_name},${data.user_name} ,${hash})`;
            const res = await connect.query(sql, []);
            connect.release();
            return res.rows[0];
        }
        catch (err) {
            throw new Error(`error was ${err}`);
        }
    }
    async show(id) {
        try {
            const connect = await database_1.default.connect();
            const sql = `SELECT * FROM Users WHERE id=${id}`;
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
            const sql = `DELETE FROM Users WHERE id=${id}`;
            const res = await connect.query(sql);
            connect.release();
            return true;
        }
        catch (err) {
            throw new Error(`error is ${err}`);
        }
    }
    async authenticate(user_name, password) {
        try {
            const connect = await database_1.default.connect();
            const sql = `SELECT * FROM Users WHERE user_name=${user_name}`;
            const res = await connect.query(sql);
            connect.release();
            const selectedLength = res.rows.length;
            if (selectedLength > 0) {
                const ans = res.rows[0];
                const flag = bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, ans.password);
                if (flag) {
                    return ans;
                }
            }
            return null;
        }
        catch (err) {
            throw new Error(`error is ${err}`);
        }
    }
}
exports.UsersStore = UsersStore;
