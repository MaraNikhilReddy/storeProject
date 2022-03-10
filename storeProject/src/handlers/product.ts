import { json } from "body-parser";
import express,{Request,Response} from "express";
import { product, productStore } from "../models/product";
import { tokenCheck } from "./user";

const store=new productStore();

const shoow=async (req:Request,res:Response)=>{
    try{
        const temp=req.body.id;
        const shower=await store.show(temp);
        res.json(shower);
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

const create=async(req:Request,res:Response)=>{
    try{
        const data:product={
            name:req.body.name,
            price:req.body.price
        }
        const nowOne=await store.create(data);
        res.json(nowOne);
    }catch(err){
        res.json(err)
        res.status(400);
    }
}

const index=async (req:Request,res:Response)=>{
    try{
        const data=store.index()
        res.json(data);
    }catch(err){
        res.json(err)
        res.status(400)
    }
}

const productRouter=(app:express.Application)=>{
    app.get("/product/:id",shoow);
    app.post("/product",tokenCheck,create);
    app.get("/product",index)
}
export default productRouter;