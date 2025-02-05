import { PrismaClient } from "@prisma/client";
import { Category } from "../interfaces/resources.interface";
import { v4 } from "uuid";

export class CategoryServices{
    prisma = new PrismaClient({
        log: ['error']
    })

    async createCategory(category:Category){
        let categoryExists = await this.prisma.categories.findUnique({
            where: {
                categoryName:category.categoryName
            }
        })
        if (categoryExists) {
            return{
                "error":"category already exists...choose a different category name"
            }
        }
        else{
            let categoryCreated = await this.prisma.categories.create({
                data : {
                    categoryId:v4(),
                    categoryName:category.categoryName
                }
            })
            if (categoryCreated) {
                return{
                    "message":"category created successfully",
                }
            }
            else{
                return{
                    "error":"Failed to create category"
                }
            }
        }
    }

    async deleteCategory(categoryId:string){
        let categoryExists = await this.prisma.categories.findUnique({
            where: {
                categoryId:categoryId
            }
        })
        if (!categoryExists) {
            return{
                "error":"The Category you are trying to delete does not exist"
            }
        }
        else{
            let deletedCategory = await this.prisma.categories.delete({
                where: {
                    categoryId:categoryId
                }
            })
            if (deletedCategory) {
                return{
                    "message":"Category deleted successfully"
                }
            }
            else{
                return{
                    "error":"Failed to delete category"
                }
            }
        }
    
    }

    async fetchCategory(categoryId:string){
        let categoryExists = await this.prisma.categories.findUnique({
            where: {
                categoryId:categoryId
            }
        })
        if (!categoryExists) {
            return{
                "error":"The Category you are trying to fetch does not exist"
            }
        }
        else{
            let categoryFetched = await this.prisma.categories.findMany({
                where: {
                    categoryId:categoryId
                },
                include: {
                    Resources: true
                }
            })
            if (categoryFetched) {
                return{
                    "message":"Category fetched successfully",
                    "category":categoryFetched
                }
            }
        }
    }

    async fetchCategories(){
        let categoriesFetched = await this.prisma.categories.findMany({
            include: {
                Resources: true
            }
        })
        if (categoriesFetched) {
            return{
                "message":"Categories fetched successfully",
                "categories":categoriesFetched
            }
        }
    }
}