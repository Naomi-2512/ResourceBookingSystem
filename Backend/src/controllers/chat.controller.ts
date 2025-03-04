import { getId, superRequest } from "../middleware/verifyTokens";
import { ChatsServices } from "../services/chat.service";
import { Request, Response } from "express";


const chatsService = new ChatsServices();
export class ChatsController{
    async createChat(req:Request,res:Response){
        try {
            let result = await chatsService.createChat(req.body);
            res.status(201).json(result)
        } catch (error) {
            res.status(501).json({
                'error':error
            })
        }
    }

    async updateChat(req:Request,res:Response){
        try {
            let result = await chatsService.updateChat(req.params.chatId,req.body.content);
            res.status(201).json(result)
        } catch (error) {
            res.status(501).json({
                'error':error
            })
        }
    }

    async deleteChat(req:Request,res:Response){
        try {
            let result = await chatsService.deleteChat(req.params.chatId);
            res.status(201).json(result)
        } catch (error) {
            res.status(501).json({
                'error':error
            })
        }
    }

    async getAllChats(req:superRequest,res:Response){
        try {
            let result = await chatsService.getAllChats(req.params.receiverId,getId(req));
            res.status(201).json(result)
        } catch (error) {
            res.status(501).json({
                'error':error
            })
        }
    }
}