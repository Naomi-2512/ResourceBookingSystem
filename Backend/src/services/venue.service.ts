import { PrismaClient } from "@prisma/client";
import { Venue } from "../interfaces/resources.interface";
import { v4 } from "uuid";

export class VenueService {
    prisma = new PrismaClient({
        log: ['error']
    })

    async CreateVenue(venue:Venue){
        let{venueId,Availability,VenueBookings, ...venueDetails}=venue
        let venueCreated = await this.prisma.venue.create({
            data : {
                venueId:v4(),
                ...venueDetails
            }
        })
        if (venueCreated) {
            return{
                "message":"vemue created successfully"
            }
        }
        else{
            return{
                "error":"Error creating venue"
            }
        }
    }

    async updateVenue(venueId:string,venue:Venue){
        let{Availability,VenueBookings,...otherDetails}=venue
        let venueUpdated = await this.prisma.venue.update({
            where:{
                venueId:venueId
            },
            data:{
                ...otherDetails
            }
        })
        if (venueUpdated) {
          return{
            "message":"Venue updated successfully"
          }  
        }
        else{
            return{
                "error":"Error updating venue"
            }
        }
    }

    async fetchOneVenue(venueId:string){
        let venueFetched = await this.prisma.venue.findUnique({
            where:{
                venueId
            },
            include:{
                VenueBookings:true
            }
        })
        if (venueFetched) {
            return {
                "message":"Venue fetched successfully",
                "venue":venueFetched
            }
        }
        else{
            return{
                "error":"Venue not found"
            }
        }
    }

    async fetchVenues(){
        let venuesFetched = await this.prisma.venue.findMany({
            include:{
                VenueBookings:true
            }
        })
        if (venuesFetched) {
            return {
                "message":"Venues fetched successfully",
                "venues":venuesFetched
            }
        }
        else{
            return{
                "error":"failed to fetch venues"
            }
        }
    }

    async deleteVenue(venueId:string){
        let venueDeleted = await this.prisma.venue.delete({
            where:{
                venueId
            }
        })
        if (venueDeleted) {
            return{
                "message":"Venue deleted successfully"
            }
        }
        else{
            return{
                "error":"Error deleting venue"
            }
        }
    }
}