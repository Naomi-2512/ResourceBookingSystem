import { ResourceService } from "../services/resource.service";
import { Request, Response } from "express";

const resourceService = new ResourceService();
export class ResourceController{
    async createResource(req:Request,res:Response){
        try {

            let result = await resourceService.createResource(req.body);
            res.status(201).json(result);
            
        } catch (error) {
            res.status(501).json({
                'error':error
            })
        }
    }

    async updateResource(req:Request,res:Response){
        try {
            let result = await resourceService.updateResource(req.body,req.params.resourceId);
            res.status(201).json(result);
        } catch(error) {
            res.status(501).json({
                'error': error
            })
        }
    }

    async fetchAllResources(res:Response){
        try {
           let result = await resourceService.fetchAllResources();
           res.status(201).json(result)
        } catch (error) {
           res.status(501).json({
            'error':error
           }) 
        }
    }

    async fetchOneResource(req:Request,res:Response){
        try {
            let result = await resourceService.fetchOneResource(req.params.resourceId);
            res.status(201).json(result)
         } catch (error) {
            res.status(501).json({
             'error':error
            }) 
         } 
    }

    async fetchResourceByCategoryId(req:Request,res:Response){
        try {
            let result = await resourceService.fetchResourceByCategoryId(req.params.categoryId);
            res.status(201).json(result)
         } catch (error) {
            res.status(501).json({
             'error':error
            }) 
         } 
    }

    async getAvailableResources(res:Response){
        try {
            let result = await resourceService.getAvailableResources();
            res.status(201).json(result)
         } catch (error) {
            res.status(501).json({
             'error':error
            }) 
         } 
    }

    async deleteResource(req:Request,res:Response){
        try {
            let result = await resourceService.deleteResource(req.params.resourceId);
            res.status(201).json(result)
         } catch (error) {
            res.status(501).json({
             'error':error
            }) 
         } 
    }
}