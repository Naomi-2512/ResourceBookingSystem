import { NextFunction, Request, Response } from "express";
import { TokenDetails } from "../interfaces/resources.interface";
import jwt from "jsonwebtoken";

export interface superRequest extends Request{
    info?: TokenDetails;
}
export const verifyTokens = (req:superRequest,res:Response,next:NextFunction) => {

    const authToken = req.headers['Authorization'] as string;

    if (!authToken){
        res.status(401).json({
            'error':'Authorization is required'
        })
    }
    else{
        const token = authToken.split(' ')[1];
        try {

            jwt.verify(token, process.env.SECRET_KEY as string, (err, data)=>{
                if(err){
                    if(err.name === 'JsonWebTokenError'){
                        res.status(401).json({
                            'error':'Invalid token'
                        })
                    }
                    else if(err.name === 'TokenExpiredError'){
                        res.status(401).json({
                            'error':'Token expired'
                        })
                    }
                    else{
                        res.status(401).json({
                            'error':'Authentication error occurred'
                        })
                    }
                }
                else{
                    req.info = data as TokenDetails;
                    next();
                }
            })
            
        } catch (error) {
            res.status(501).json({
                'error': error
            })
        }
    }
}

export const getId = (req:superRequest):string => {
    let userId = req.info?.userId as string;
    if(userId){
        return userId;
    }
    else{
        return '';
    }
}