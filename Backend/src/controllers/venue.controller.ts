import { VenueService } from "../services/venue.service";
import { Request, Response } from "express";

const venueService = new VenueService();
export class VenueController{
    async createVenue(req:Request,res:Response){
        try {
           let result = await venueService.CreateVenue(req.body);
           res.status(201).json(result);
        } catch (error) {
          res.status(501).json({
            'error':error
          })  
        }
    }

    async updateVenue(req:Request,res:Response){
        try {
            let result = await venueService.updateVenue(req.params.venueId, req.body);
            res.status(201).json(result);
         } catch (error) {
           res.status(501).json({
             'error':error
           })  
         } 
    }

    async fetchOneVenue(req:Request,res:Response){
        try {
            let result = await venueService.fetchOneVenue(req.params.venueId);
            res.status(201).json(result);
         } catch (error) {
           res.status(501).json({
             'error':error
           })  
         }
    }
    async fetchVenues(req:Request,res:Response){
        try {
            let result = await venueService.fetchVenues();
            res.status(201).json(result);
         } catch (error) {
           res.status(501).json({
             'error':error
           })  
         }
    }

    async deleteVenue(req:Request,res:Response){
        try {
            let result = await venueService.deleteVenue(req.params.venueId);
            res.status(201).json(result);
         } catch (error) {
           res.status(501).json({
             'error':error
           })  
         }
    }
}