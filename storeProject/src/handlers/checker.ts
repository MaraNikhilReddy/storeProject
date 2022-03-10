import jwt, { Secret } from "jsonwebtoken";
import express, { NextFunction } from "express";
import { User } from "../models/user";

const secretCode=process.env.TOKEN_SECRET as Secret;

const check=(req:Request,res:Response,next:NextFunction)=>{
    // try{
    //     const 
    // }
}

// const 