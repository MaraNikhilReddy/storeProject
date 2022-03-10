import bcrypt from "bcrypt";
import client from "../database";
import dotenv from "dotenv";

dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
    POSTGRES_TEST,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
}=process.env;

export type User={
    // id:Number;
    first_name:string;
    last_name:string;
    user_name:string
    password:string;

}



export type showUser={
    id:number
    first_name:string;
    last_name:string;
    user_name:string
}

export class UsersStore{
    async index():Promise<showUser[]>{
        try{
            const connect=await client.connect();
            const sql='SELECT * FROM Users'
            const res=await connect.query(sql);
            connect.release();
            return res.rows;
        }catch(err){
            throw new Error(`error was ${err}`);
        }
    }
    async create(data:User):Promise<showUser>{
        try{
            const hash=bcrypt.hashSync(data.password+BCRYPT_PASSWORD,parseInt(SALT_ROUNDS as string))
            const connect=await client.connect();
            const sql=`INSERT INTO Users (first_name, last_name, user_name, password) VALUES (${data.first_name}, ${data.last_name},${data.user_name} ,${hash})`
            const res=await connect.query(sql,[]);
            connect.release();
            return res.rows[0];
        }catch(err){
            throw new Error(`error was ${err}`);
        }
    }
    async show(id:string):Promise<showUser[]>{
        try{
            const connect=await client.connect();
            const sql=`SELECT * FROM Users WHERE id=${id}`;
            const res=await connect.query(sql);
            connect.release();
            return res.rows;
        }catch(err){
            throw new Error(`error was ${err}`);
        }
    }
    async delete(id:string):Promise<boolean>{
        try{
             const connect=await client.connect();
             const sql=`DELETE FROM Users WHERE id=${id}`;
             const res=await connect.query(sql);
             connect.release();
             return true;
        }catch(err){
            throw new Error(`error is ${err}`);
        }
    }

    async authenticate(user_name:string, password:string):Promise<User|null>{
        try{
            const connect=await client.connect();
            const sql=`SELECT * FROM Users WHERE user_name=${user_name}`;
            const res=await connect.query(sql);
            connect.release();
            const selectedLength=res.rows.length;
            if(selectedLength>0){
                const ans=res.rows[0]
                const flag=bcrypt.compareSync(password+BCRYPT_PASSWORD,ans.password)
                if(flag)
                {
                    return ans;
                }
            }
            return null;
        }catch(err){
            throw new Error(`error is ${err}`)
        }
    }
}