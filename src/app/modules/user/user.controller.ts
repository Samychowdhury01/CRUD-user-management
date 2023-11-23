// controller for create a new user

import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async(req : Request, res: Response) =>{
try{
const user = req.body
const result = await UserService.crateUserInDB(user)

res.status(200).json({
    "success": true,
    "message": "User created successfully!",
    "data" : result
})

}
catch(err : any){
res.status(500).json({
    "success": true,
    "message":  err.message ||"Something went wrong",
    "data" : err
})
}
}

export const UserController = {
    createUser
}