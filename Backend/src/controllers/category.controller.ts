import { CategoryServices } from "../services/category.service";
import { Request, Response } from "express";

const categoryService = new CategoryServices();

export class CategoryController{
    async createCategory(req:Request,res:Response){
        try {
            let result = await categoryService.createCategory(req.body);
            res.status(201).json(result)
          } catch (error) {
            res.status(501).json({
              'error':error
            })
          }
    }

    async deleteCategory(req:Request,res:Response){
        try {
            let result = await categoryService.deleteCategory(req.params.categoryId);
            res.status(201).json(result)
          } catch (error) {
            res.status(501).json({
              'error':error
            })
          } 
    }

    async fetchCategory(req:Request,res:Response){
        try {
            let result = await categoryService.fetchCategory(req.params.categoryId);
            res.status(201).json(result)
          } catch (error) {
            res.status(501).json({
              'error':error
            })
          }
    }

    async fetchCategories(res:Response){
        try {
            let result = await categoryService.fetchCategories();
            res.status(201).json(result)
          } catch (error) {
            res.status(501).json({
              'error':error
            })
          }
    }
}