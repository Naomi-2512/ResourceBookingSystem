import { PrismaClient } from "@prisma/client";
import { Resource, ResourceBooking } from "../interfaces/resources.interface";
import { v4 } from "uuid";

export class ResourceBookingsService{
    prisma = new PrismaClient({
        log:['error']
    })

    async createResourceBook(book:ResourceBooking,UserId:string,ResourceId:string){
        let resourceExists = await this.prisma.resources.findUnique({
            where:{
                resourceId:ResourceId
            }
        })
        if (!resourceExists) {
          return{
            "error":"Resource you are trying to book doesnt exist"
          }  
        }
        else{
            // return{
            //     "message":"Resource exists, you can book",
            //     "totalNumber": resourceExists.Quantity,
            //     "remainingQuantity":resourceExists.remainingQuantity,
            //     "booked":resourceExists.Quantity - resourceExists.remainingQuantity
            // }
            let{bookId,userId,resourceId,dateBooked,actualReturnDate,isApproved,isCancelled,isReturned,User,Resources, ...bookingDetails}= book;
        let bookCreated = await this.prisma.resourceBookings.create({
            data :{
                bookId:v4(),
                userId:UserId,
                resourceId:ResourceId,
                actualReturnDate:book.actualReturnDate,
                ...bookingDetails
            }
        })
        if (!bookCreated) {
            return{
                "error":"unable to book"
            }
        }
        else {
            let unBooked = resourceExists.remainingQuantity - book.quantity;
            await this.prisma.resources.update({
                data:{
                    remainingQuantity :unBooked
                },
                where:{
                    resourceId:ResourceId
                }
            })
            return{
                "message":"Booked successfully"
            }
        } 
        }
        
    }

    async updateResourceBook(BookId:string,book:ResourceBooking){
        let{bookId,userId,resourceId,dateBooked,actualReturnDate,isApproved,isCancelled,isReturned,User,Resources, ...bookingDetails}= book;
        let bookUpdated = await this.prisma.resourceBookings.update({
            where:{
                bookId:BookId
            },
            data:{
                ...bookingDetails
            }
        })
        if (bookUpdated) {
            return{
                "message":"Book updated successfully"
            }
        }
        else{
            return{
                "error":"Unable to update book"
            }
        }
    }

    async cancelResourceBook(bookId:string){
        let bookCancelled = await this.prisma.resourceBookings.update({
            where:{
                bookId: bookId
            },
            data:{
                isCancelled:true
            }
        })
        if (bookCancelled) {
            return{
                "message":"Book cancelled successfully"
            }
        }
        else{
            return{
                "error":"Unable to cancel book"
            }
        }
    }

    async approveBooking(bookId:string){
        let bookApproved = await this.prisma.resourceBookings.update({
            where:{
                bookId: bookId
            },
            data:{
                isApproved:true
            }
        })
        if (bookApproved) {
            return{
                "message":"Booking approved successfully"
            }
        }
        else{
            return{
                "error":"Unable to approve booking"
            }
        }
    }

    async returnResourceBook(bookId:string,resourceId:string){
        let bookReturned = await this.prisma.resourceBookings.update({
            where:{
                bookId: bookId
            },
            data:{
                isReturned:true
            }
        })
        if (!bookReturned) {
            return{
                "error":"Unable to return resource"
            }
        }
        else{
            let resourceExists = await this.prisma.resources.findUnique({
                where:{
                    resourceId
                }
            })
            if(!resourceExists){
                return{
                    "error":"The resource you are returning does not exist"
                }
            }
            else{
                let newQuantity = resourceExists.remainingQuantity + bookReturned.quantity;
            await this.prisma.resources.update({
                where:{
                    resourceId:resourceExists.resourceId
                },
                data:{
                    remainingQuantity :newQuantity
                }
            })
            return{
                "message":"Resource returned successfully"
            }
            }
            
        }
    }

    async getAllResourceBookings(){
        let bookings = await this.prisma.resourceBookings.findMany({
            where:{
                isCancelled:false
            },
            include:{
                User: true,
                Resources: true
            }
        })
        if (bookings) {
            return{
                "message":"All bookings retrieved successfully",
                "bookings":bookings,
            }
        }
        else{
            return{
                "error":"Unable to retrieve all bookings"
            }
        }
    }

    async getResourceBookingsByUserId(userId:string){
        let bookings = await this.prisma.resourceBookings.findMany({
            where:{
                userId: userId,
                isCancelled:false
            },
            include:{
                User: true,
                Resources: true
            }
        })
        if (bookings) {
            return{
                "message":"All bookings retrieved successfully",
                "bookings":bookings,
            }
        }
        else{
            return{
                "error":"Unable to retrieve bookings by user"
            }
        }
    }
    
    async getResourceBookingsByResourceId(resourceId:string){
        let bookings = await this.prisma.resourceBookings.findMany({
            where:{
                resourceId: resourceId,
                isCancelled:false
            },
            include:{
                User: true,
                Resources: true
            }
        })
        if (bookings) {
            return{
                "message":"All bookings retrieved successfully",
                "bookings":bookings,
            }
        }
        else{
            return{
                "error":"Unable to retrieve bookings by resource"
            }
        }
    }

    async getOneBook(bookId:string){
        let book = await this.prisma.resourceBookings.findUnique({
            where:{
                bookId: bookId
            },
            include:{
                User: true,
                Resources: true
            }
        })
        if (book) {
            return{
                "message":"Book retrieved successfully",
                "book":book,
            }
        }
        else{
            return{
                "error":"Unable to retrieve book"
            }
        }
    }

    async getBookStatistics(resourceId:string){
        let bookings = await this.prisma.resources.findUnique({
            where:{
                resourceId,
            }
        })
        if (bookings) {
            let bookedItems =bookings.Quantity - bookings.remainingQuantity;
            return{
                "bookedItems": bookedItems,
                "totalItems":bookings.Quantity,
                "remainingItems":bookings.remainingQuantity,
                "message":"book statistics retrieved successfully"
            }
        }
        else{
            return{
                "error":"Unable to retrieve book statistics"
            }
        }
       
    }
}