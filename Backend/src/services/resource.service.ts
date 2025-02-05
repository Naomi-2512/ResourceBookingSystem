import { PrismaClient } from "@prisma/client";
import { Resource } from "../interfaces/resources.interface";
import { v4 } from "uuid";

export class ResourceService{
    prisma = new PrismaClient({
        log:['error']
    })

    async createResource(resource: Resource){
        let{resourceId, categoryId,ResourceBookings,categories,Availability,Quantity, ...resourceDetails} = resource;
        let resourceCreated = await this.prisma.resources.create({
            data:{
                resourceId:v4(),
                categoryId:resource.categoryId,
                ...resourceDetails,
                Quantity:resource.remainingQuantity
            }
        })
        if (resourceCreated) {
           return {
            "message":"Resource created successfully"
           } 
        }
        else{
            return {
                "error":"Failed to create resource"
            }
        }
    }

    async updateResource(resource: Resource,resourceId:string){
        let{categoryId, ResourceBookings,categories, ...resourceDetails} = resource;
        let resourceUpdated = await this.prisma.resources.update({
            where:{
                resourceId:resourceId
            },
            data:{
                ...resourceDetails,
            }
        })
        if (resourceUpdated) {
            return{
                "message": "Resource updated"
            }
        }
        else{
            return {
                "error":"Failed to update resource"
            }
        }
    }

    async fetchAllResources(){
        let resourcesFetched = await this.prisma.resources.findMany({
        })
        if (resourcesFetched) {
            return{
                "resources": resourcesFetched,
                "message":"Resources fetched successfully"
            }
        }
        else{
            return{
                "error":"Failed to fetch resources"
            }
        }
    }

    async fetchOneResource(resourceId:string){
        let resourceFetched = await this.prisma.resources.findUnique({
            where:{
                resourceId
            },
        })
        if (resourceFetched) {
            return{
                "resource": resourceFetched,
                "message":"Resource fetched successfully"
            }
        }
        else{
            return{
                "error":"Failed to fetch resource"
            }
        }
    }

    async fetchResourceByCategoryId(categoryId:string){
        let resourcesFetched = await this.prisma.resources.findMany({
            where:{
                categoryId
            },
        })
        if (resourcesFetched) {
            return{
                "resources": resourcesFetched,
                "message":"Resources fetched successfully"
            }
        }
        else{
            return{
                "error":"Failed to fetch resources"
            }
        }
    }
    
    async getAvailableResiurces(Availability:boolean){
        let resourcesFetched = await this.prisma.resources.findMany({
            where:{
                Availability:true
            },
        })
        if (resourcesFetched) {
            return{
                "resources": resourcesFetched,
                "message":" Available Resources fetched successfully"
            }
        }
        else{
            return{
                "error":"Failed to fetch resources"
            }
        }
    }

    async deleteResource(resourceId:string){
        let resourceDeleted = await this.prisma.resources.delete({
            where:{
                resourceId
            },
        })
        if (resourceDeleted) {
            return{
                "message":"Resource deleted successfully"
            }
        }
        else{
            return{
                "error":"Failed to delete resource"
            }
        }
    }

}