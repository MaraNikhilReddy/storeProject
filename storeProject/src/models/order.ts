import client from "../database";

export type order={
    // id:Number;
    quantity:number;
    user_id:number;
    status:string;
}

export class orderStore{
    async index():Promise<order[]>{
        try{
            const connect=await client.connect();
            const sql='SELECT * FROM Orders'
            const res=await connect.query(sql);
            connect.release();
            return res.rows;
        }catch(err){
            throw new Error(`error was ${err}`);
        }
    }
    async show(id:string):Promise<order[]>{
        try{
            const connect=await client.connect();
            const sql=`SELECT * FROM Orders WHERE id=${id}`;
            const res=await connect.query(sql);
            connect.release();
            return res.rows;
        }catch(err){
            throw new Error(`error was ${err}`);
        }
    }
    async create(data:order):Promise<order>{
        try{
            const connect=await client.connect();
            const sql=`INSERT INTO Orders (quantity, user_id, status) VALUES (${data.quantity}, ${data.user_id}, ${data.status})`
            const res=await connect.query(sql);
            connect.release();
            return res.rows[0];
        }catch(err){
            throw new Error(`error was ${err}`);
        }
    }

    // async userOrders(id:string):Promise<order[]>{
        
    // }

   async delete(id:string):Promise<order[]>{
       try{
            const connect=await client.connect();
            const sql=`DELETE FROM Orders WHERE id=${id}`;
            const res=await connect.query(sql);
            connect.release();
            return res.rows;
       }catch(err){
           throw new Error(`error is ${err}`);
       }
   }
}