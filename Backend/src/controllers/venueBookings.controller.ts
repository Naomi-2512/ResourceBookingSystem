import { getId, superRequest } from "../middleware/verifyTokens";
import { VenueBookingsService } from "../services/venuebookings.service";
import { Request, Response } from "express";

const venueBookingsService = new VenueBookingsService();
export class VenueBookingController{
    async createVenueBookings(req:Request,res:Response){
        try {
            let result = await venueBookingsService.createVenueBookings(req.body,req.params.venueId);
            res.status(201).json(result)
        } catch (error) {
            res.status(501).json({
                'error':error
            })
        }
    }

    async updateVenueBook(req:Request,res:Response){
        try {
            let result = await venueBookingsService.updateVenueBook(req.params.BookId,req.body);
            res.status(201).json(result)
        } catch (error) {
            res.status(501).json({
                'error':error
            })
        }
    }

    async cancelBooking(req:Request,res:Response){
        try {
            let result = await venueBookingsService.cancelBooking(req.params.bookId);
            res.status(201).json(result)
        } catch (error) {
            res.status(501).json({
                'error':error
            })
        }
    }

    async approveBooking(req:Request,res:Response){
        try {
            let result = await venueBookingsService.approveBooking(req.params.bookiId);
            res.status(201).json(result)
        } catch (error) {
            res.status(501).json({
                'error':error
            })
        }
    }

    async getVenueBookingsByUserId(req:superRequest,res:Response){
        try {
            let result = await venueBookingsService.getVenueBookingsByUserId(getId(req));
            res.status(201).json(result)
        } catch (error) {
            res.status(501).json({
                'error':error
            })
        }
    }

    async getVenueBookingsByVenueId(req:Request,res:Response){
        try {
            let result = await venueBookingsService.getVenueBookingsByVenueId(req.params.venueId)
            res.status(201).json(result)
        } catch (error) {
            res.status(501).json({
                'error':error
            })
        }
    }
    async getVenueBookingsByDate(res:Response){
        try {
            let result = await venueBookingsService.getVenueBookingsByDate();
            res.status(201).json(result)
        } catch (error) {
            res.status(501).json({
                'error':error
            })
        }
    }
}