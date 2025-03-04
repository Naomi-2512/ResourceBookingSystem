import { getId, superRequest } from "../middleware/verifyTokens";
import { ResourceBookingsService } from "../services/resourcebookings.service";
import { Request, Response } from "express";

const resourceBookingService = new ResourceBookingsService();
export class ResourceBookingController{
    async createResourceBook(req:superRequest,res:Response){
        try {
            let result = await resourceBookingService.createResourceBook(req.body,getId(req),req.params.ResourceId);
            res.status(201).json(result);
         } catch (error) {
           res.status(501).json({
             'error':error
           })  
         }
    }

    async updateResourceBook(req:Request,res:Response){
        try {
            let result = await resourceBookingService.updateResourceBook(req.params.BookId,req.body);
            res.status(201).json(result);
         } catch (error) {
           res.status(501).json({
             'error':error
           })  
         }
    }

    async cancelResourceBook(req:Request,res:Response){
        try {
            let result = await resourceBookingService.cancelResourceBook(req.params.bookId);
            res.status(201).json(result);
         } catch (error) {
           res.status(501).json({
             'error':error
           })  
         }
    }

    async approveBooking(req:Request,res:Response){
        try {
            let result = await resourceBookingService.approveBooking(req.params.bookId);
            res.status(201).json(result);
         } catch (error) {
           res.status(501).json({
             'error':error
           })  
         }
    }

    async returnResourceBook(req:Request,res:Response){
        try {
            let result = await resourceBookingService.returnResourceBook(req.body);
            res.status(201).json(result);
         } catch (error) {
           res.status(501).json({
             'error':error
           })  
         }
    }

    async getAllResourceBookings(res:Response){
        try {
            let result = await resourceBookingService.getAllResourceBookings();
            res.status(201).json(result);
         } catch (error) {
           res.status(501).json({
             'error':error
           })  
         }
    }

    async getResourceBookingsByUserId(req:superRequest,res:Response){
        try {
            let result = await resourceBookingService.getResourceBookingsByUserId(getId(req));
            res.status(201).json(result);
         } catch (error) {
           res.status(501).json({
             'error':error
           })  
         }
    }

    async getOneBook(req:Request,res:Response){
        try {
            let result = await resourceBookingService.getOneBook(req.params.bookId);
            res.status(201).json(result);
         } catch (error) {
           res.status(501).json({
             'error':error
           })  
         }
    }

    async getBookStatistics(req:Request,res:Response){
        try {
            let result = await resourceBookingService.getBookStatistics(req.params.resourceId);
            res.status(201).json(result);
         } catch (error) {
           res.status(501).json({
             'error':error
           })  
         }
    }
}