import { getId, superRequest } from "../middleware/verifyTokens";
import { UserService } from "../services/user.service";
import { Request, Response } from "express";

const userService = new UserService();
export class UserController{
    async createUser(req:Request,res:Response){
        try {
            let result = await userService.createUser(req.body);
            res.status(201).json(result);
         } catch (error) {
           res.status(501).json({
             'error':error
           })  
         }
    }

    async updateUser(req:superRequest,res:Response){
        try {
            let result = await userService.updateUser(req.body, getId(req));
            res.status(201).json(result);
         } catch (error) {
           res.status(501).json({
             'error':error
           })  
         } 
    }

    async deleteUser(req:Request,res:Response){
        try {
            let result = await userService.deleteUser(req.params.userId);
            res.status(201).json(result);
         } catch (error) {
           res.status(501).json({
             'error':error
           })  
         } 
    }

    async fetchUser(req:Request,res:Response){
        try {
            let result = await userService.fetchUser(req.params.userId);
            res.status(201).json(result);
         } catch (error) {
           res.status(501).json({
             'error':error
           })  
         }
    }

    async fetchUsers(res:Response){
      try {
        let result = await userService.fetchUsers();
        res.status(201).json(result)
      } catch (error) {
        res.status(501).json({
          'error':error
        })
      }
    }

    async fetchDeletedUsers(res:Response){
      try {
        let result = await userService.fetchDeletedUsers();
        res.status(201).json(result)
      } catch (error) {
        res.status(501).json({
          'error':error
        })
      }
    }

    async restoreDeletedUser(req:Request,res:Response){
      try {
        let result = await userService.restoreDeletedUser(req.params.userId);
        res.status(201).json(result)
      } catch (error) {
        res.status(501).json({
          'error':error
        })
      }
    }
}