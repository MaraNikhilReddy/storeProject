import { order, orderStore } from "../models/order";
import express,{Request,Response} from "express"
import { tokenCheck } from "./user";



const store=new orderStore();

const index=async (req:Request,res:Response)=>{
    try{
        const data=await store.index();
        res.json(data);
    }catch(err){
        res.json(err);
        res.status(400);
    }
}

const show=async (req:Request,res:Response)=>{
    try{
        const param=req.body.id;
        const shower=await store.show(param);
        res.json(shower)
    }catch(err){
        res.status(400)
        res.json(err);
    }
}

const create=async(req:Request,res:Response)=>{
    try{
        const data:order={
            // id:1,
            quantity: req.body.quantity,
            user_id: req.body.user_id,
            status: req.body.status,
        }

        const newOne=await store.create(data);
        res.json(newOne);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const OrderRouter=(app:express.Application)=>{
    app.get("/orders/:id",show);
    app.get("/orders",index);
    app.post("/orders",tokenCheck,create)

}

export default OrderRouter;