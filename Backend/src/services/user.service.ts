import { PrismaClient } from "@prisma/client";
import { User } from "../interfaces/resources.interface";
import bcrypt from "bcrypt"
import { v4 } from "uuid";


export class UserService{
    prisma = new PrismaClient({
        log: ['error']
    })

    async createUser(user:User){
        let emailExists = await this.prisma.users.findUnique({
            where : {
                email:user.email
            }
        })

        if (emailExists) {
            if (emailExists.isDeleted == true) {
                return{
                    "error": "your account has been banned..register with a new email or contact Admin"
                }
            }
            else{
                return{
                    "error":"You are already registered...login instead"
                }
            }
        }

        let phone1Exists = await this.prisma.users.findUnique({
            where : {
                phone1:user.phone1
            }
        })
        if (phone1Exists) {
            if (phone1Exists.isDeleted == true) {
                return{
                    "error": "your account has been banned..register with a new email or contact Admin"
                }
            }
            else{
                return{
                    "error":"Phone 1 already exists...login or register with a different number"
                }
            }
        }

        let phone2Exists = await this.prisma.users.findUnique({
            where : {
                phone2:user.phone2
            }
        })
        if (phone2Exists) {
            if (phone2Exists.isDeleted == true) {
                return{
                    "error": "your account has been banned..register with a new email or contact Admin"
                }
            }
            else{
                return{
                    "error":"Phone 2 already exists...login or register with a different number"
                }
            }
        }

        let hashedPassword = bcrypt.hashSync(user.password,14);
        let{userId,password,isDeleted,isWelcomed,ResourceBookings,VenueBookings,ChatsSent,ChatsReceived, ...otherDetails} = user;

        let userCreated = await this.prisma.users.create({
            data: {
                userId:v4(),
                password:hashedPassword,
                ...otherDetails
            }
        })
        if (userCreated) {
            return{
                "message":"Account created successfully"
            }
        }
        else{
            return{
                "error":"Failed to create account..try again later or contact admin"
            }
        }
    }

    async updateUser(user:User, userId:string){
        let userExists = await this.prisma.users.findUnique({
            where : {
                userId
            }
        })

        if (!userExists) {
            return{
                "error":"The account you are trying to update does not exist"
            }
        }
        else{
            let{userId,isDeleted,isWelcomed,ResourceBookings,VenueBookings,ChatsSent,ChatsReceived, ...otherDetails} = user;

            let userUpdated = await this.prisma.users.update({
                where : {
                    userId
                },
                data: {
                    ...otherDetails
                }
            })
            if (userUpdated) {
                return{
                    "message":"Account updated succefully"
                }
            }
            else{
                return{
                    "error":"Failed to update account"
                }
            }
        }
    }

    async deleteUser(userId:string){
        let userExists = await this.prisma.users.findUnique({
            where : {
                userId
            }
        })
        if (!userExists) {
            return{
                "error":"The account you are trying to delete does not exist"
            }
    
        }
        else{
            let userDeleted = await this.prisma.users.delete({
                where:{
                    userId
                }
            })
            if (userDeleted) {
                return{
                    "message":"Account deleted successfulle"
                }
            }
            else{
                return{
                    "error":"failed to delete account"
                }
            }
        }
    }

    async fetchUser(userId:string){
        let userFetched = await this.prisma.users.findFirst({
            where : {
                userId,
                isDeleted: false
            },
            include:{
                ResourceBookings: true,
                VenueBookings: true,
            }
            
        })
        if (userFetched) {
            return{
                "message": "user fetched successfully",
                "user": userFetched
            }
        }
        else{
            return{
                "error":"error in fetching user"
            }
        }
    }

    async fetchUsers(){
        let usersFetched = await this.prisma.users.findMany({
            where : {
                isDeleted: false
            }
        })
        if (usersFetched) {
            return{
                "message": "users fetched successfully",
                "users": usersFetched
            }
        }
        else{
            return{
                "error":"error in fetching users"
            }
        }
    }

    async fetchDeletedUsers(){
        let deletedUsersFetched = await this.prisma.users.findMany({
            where : {
                isDeleted: true
            }
        })
        if (deletedUsersFetched) {
            return{
                "message": "users fetched successfully",
                "users": deletedUsersFetched
            }
        }
        else{
            return{
                "error":"error in fetching users"
            }
        }
    }

    async restoreDeletedUser(userId:string){
        let userExists = await this.prisma.users.findFirst({
            where:{
                userId,
                isDeleted: false
            }
        })
        if (userExists) {
            return{
                "error":"The account isnt deleted...does not need restoring"
            }
        }
        else{
            let userRestored = await this.prisma.users.update({
                where : {
                    userId
                },
                data: {
                    isDeleted: false
                }
            })
            if (userRestored) {
                return{
                    "message":"Account restored successfully"
                }
            }
            else{
                return{
                    "error":"Failed to restore account"
                }
            }
        }
    }
}