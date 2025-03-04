import { PrismaClient } from "@prisma/client";
import { Chat } from "../interfaces/resources.interface";
import { v4 } from "uuid";

export class ChatsServices{
    prisma = new PrismaClient({
        log:['error']
    })

    async createChat(chat:Chat){
        let{chatId,senderId,receiverId,dateCreated,dateModified,Sender,Receiver, ...chatDetails} = chat;
       let chatCreated = await this.prisma.chats.create({
        data:{
            chatId:v4(),
            senderId:chat.senderId,
            receiverId:chat.receiverId,
            ...chatDetails
        }
       })
       if(chatCreated){
        return{
            "message":"Chat created successfully"
        }
       }
       else{
        return{
            "error":"Failed to create chat"
        }
       }
    }

    async updateChat(chatId:string,content:string){
      let chatUpdated = await this.prisma.chats.update({
        where:{
            chatId
        },
        data:{
            content,
            dateModified:new Date()
        }
      })  
      if(chatUpdated){
        return{
            "message":"Chat modified successfully"
        }
      }
      else{
        return{
            "error":"Failed to update chat"
        }
      }
    }

    async deleteChat(chatId:string){
        let chatDeleted = await this.prisma.chats.delete({
            where:{
                chatId
            }
        })
        if(chatDeleted){
            return{
                "message":"Chat deleted successfully"
            }
        }
        else{
            return{
                "error":"Failed to delete chat"
            }
        }
    }

    async getAllChats(senderId:string,receiverId:string){
        let chats = await this.prisma.chats.findMany({
            where:{
                OR:[
                    {senderId,receiverId},
                    {senderId:receiverId,receiverId:senderId}
                ]
            },
            include:{
                Sender:true,Receiver:true
                },
            orderBy:{
                dateCreated: 'asc'
            }
            
        })
        if (chats) {
            return{
                "message":"Chats retrieved successfully",
                "chats":chats
            }
        }
        else{
            return{
                "error":"Failed to retrieve chats"
            }
        }
    }

    async getOneChat(chatId:string){
        let chatFetched = await this.prisma.chats.findMany({
            where:{
                chatId
            }
        })
        if (chatFetched) {
            return{
                "message":"Chat fetched successfully"
            }
        }
        else{
            return{
                "error":"Failed to fetch chat"
            }
        }
    }
}