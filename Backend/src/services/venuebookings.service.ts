import { PrismaClient } from "@prisma/client";
import { VenueBooking } from "../interfaces/resources.interface";
import { v4 } from "uuid";

export class VenueBookingsService{
    prisma = new PrismaClient({
        log:['error']
    })

    async createVenueBookings(venueBook:VenueBooking,venueId:string){
        let venueExists = await this.prisma.venue.findUnique({
            where: {
                venueId
            }
        })
        if (!venueExists) {
            return{
                "error":"The venue you are trying to book does not exist"
            }
        }
        else{
            let{venueId,bookId,userId,isApproved,isCancelled,dateBooked,User,Venue, ...bookinDetails} = venueBook;
            let venueCreated = await this.prisma.venueBookings.create({
                data:{
                    bookId:v4(),
                    venueId:venueBook.venueId,
                    userId:venueBook.userId,
                    ...bookinDetails
                }
            })
            if (venueCreated) {
                return{
                    "message":"venue booked successfully"
                }
            }
            else{
                return{
                    "error":"An error occurred while booking the venue"
                }
            }
        }
    }

    async updateVenueBook(BookId:string,venueBook:VenueBooking){
        let{venueId,bookId,userId,isApproved,isCancelled,dateBooked,User,Venue, ...bookinDetails} = venueBook;
        let venueExists = await this.prisma.venue.findUnique({
            where: {
                venueId
            }
        })
        if (!venueExists) {
            return{
                "error":"The venue you are trying to book does not exist"
            }
        }
        else{
            let venueUpdated = await this.prisma.venueBookings.update({
                where:{
                    bookId:BookId
                },
                data:{
                    ...bookinDetails
                }
            })
            if (venueUpdated) {
                return{
                    "message":"venue booking updated successfully"
                }
            }
            else{
                return{
                    "error":"An error occurred while updating the venue booking"
                }
            }
        }
    }

    async cancelBooking(bookId:string){
        let bookCanceled = await this.prisma.venueBookings.update({
            where:{
                bookId
            },
            data:{
                isCancelled:true
            }
        })
        if (bookCanceled) {
            return{
                "message":"venue booked canceled successfully"
            }
        }
        else{
            return{
                "error":"An error occurred while canceling the venue booking"
            }
        }
    }

    async approveBooking(bookId:string){
        let bookApproved = await this.prisma.venueBookings.update({
            where:{
                bookId
            },
            data:{
                isApproved:true
            }
        })
        if (bookApproved) {
            return{
                "message":"venue booking approved successfully"
            }
        }
        else{
            return{
                "error":"An error occurred while approving the venue booking"
            }
        }
    }

    async getVenueBookingsByUserId(userId:string){
        let venueBookings = await this.prisma.venueBookings.findMany({
            where:{
                userId
            },
            include:{
                User: true,
                Venue: true
            }
        })
        if (venueBookings) {
            return {
                "venueBookings":venueBookings,
                "message":"Venue bookings retrieved successfully"
            }
        }
        else{
            return{
                "error":"No venue bookings found for the given user"
            }
        }
    }

    async getVenueBookingsByVenueId(venueId:string){
        let venueBookings = await this.prisma.venueBookings.findMany({
            where:{
                venueId
            },
            include:{
                User: true,
                Venue: true
            }
        })
        if (venueBookings) {
            return {
                "venueBookings":venueBookings,
                "message":"Venue bookings retrieved successfully"
            }
        }
        else{
            return{
                "error":"No venue bookings found for the given venue"
            }
        }
    }

    async getVenueBookingsByDate(){
        let venueBookings = await this.prisma.venueBookings.findMany({
            include:{
                User: true,
                Venue: true
            },
            orderBy:{
                dateBooked: 'asc'
            }
        })
        if (venueBookings) {
            return {
                "venueBookings":venueBookings,
                "message":"Venue bookings retrieved successfully"
            }
        }
        else{
            return{
                "error":"No venue bookings found for the given date"
            }
        }
    }
}