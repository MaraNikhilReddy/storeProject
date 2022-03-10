import express,{NextFunction, Request,Response} from "express";
import { UsersStore,User } from "../models/user";
import jwt, { Secret } from "jsonwebtoken";

const store=new UsersStore();

const secret_code=process.env.TOKEN_SECRET as Secret;

const create=async(req:Request,res:Response)=>{
    try{
        const user:User={
            // id:req.body.id,
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            user_name:req.body.user_name,
            password:req.body.password
        }
        let newOne=await store.create(user);
        const newOneData =jwt.sign({newOne},secret_code);
        res.json({newOneData});
    }catch(err){
        res.json(err)
        res.status(400)
    }
}

const index=async(req:Request,res:Response)=>{
    try{
        const shower=await store.index();
        res.json(shower);
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

const show=async(req:Request,res:Response)=>{
    const shower=await store.show(req.body.id);
    res.json(shower)
}

const remove=async(req:Request,res:Response)=>{
    const removed=await store.delete(req.body.id);
    res.json(removed);
}
const authenticator=async(req:Request,res:Response)=>{
    try{
        const usrnm=req.body.user_name;
        const pswrd=req.body.password as string;

        const checked=store.authenticate(usrnm,pswrd);
        if(!checked){
            res.send("invalid credentials");
            res.status(400);
        }
        else{
            const newOneData =jwt.sign({checked},secret_code);
            res.json(newOneData);
        }
    }catch(err){
        res.json(err)
        res.status(400)
    }
}

export function tokenCheck(req:Request,res:Response,next:NextFunction){
    try{
        const temp:string=req.headers.authorization?.split(" ")[1] as string;
        jwt.verify(temp,secret_code)
        next();
    }catch(err){
        res.status(401);
        res.json(err)
    }
}

const userRouter=(app:express.Application)=>{
    app.get("/users",tokenCheck,index);
    app.post("/users",create);
    app.get("/users/:id",tokenCheck,show);
    app.post("/users/authenticate",authenticator);
}

export default userRouter;