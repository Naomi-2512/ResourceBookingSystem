import express, { Express, json, NextFunction, Request, Response } from "express";
import cors from 'cors';

const app = express();

app.use(json());
app.use(cors());

app.use((err:Error, req:Request,res:Response,next:NextFunction) =>{
    res.json({
        message:err.message
    })
});

app.listen(3000, ()=>{
    console.log('server is litsening on port 3000')
})


