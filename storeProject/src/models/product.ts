import client from "../database";

export type product={
    // id:Number;
    name:string;
    price:number
}

export class productStore{
    async index():Promise<product[]>{
        try{
            const connect=await client.connect();
            const sql='SELECT * FROM Product'
            const res=await connect.query(sql);
            connect.release();
            return res.rows;
        }catch(err){
            throw new Error(`error was ${err}`);
        }
    }
    async show(id:string):Promise<product[]>{
        try{
            const connect=await client.connect();
            const sql=`SELECT * FROM Product WHERE id=${id}`;
            const res=await connect.query(sql);
            connect.release();
            return res.rows;
        }catch(err){
            throw new Error(`error was ${err}`);
        }
    }
    async create(data:product):Promise<product[]>{
        try{
            const connect=await client.connect();
            const sql=`INSERT INTO Product (name, price) VALUES (${data.name}, ${data.price})`
            const res=await connect.query(sql);
            connect.release();
            return res.rows;
        }catch(err){
            throw new Error(`error was ${err}`);
        }
    }

   async delete(id:string):Promise<product[]>{
       try{
            const connect=await client.connect();
            const sql=`DELETE FROM Product WHERE id=${id}`;
            const res=await connect.query(sql);
            connect.release();
            return res.rows;
       }catch(err){
           throw new Error(`error is ${err}`);
       }
   }
}