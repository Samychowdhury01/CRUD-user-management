import { Request, Response } from 'express';
import { UserService } from './user.service';
import validationSchema from './user.validation';
import { z } from 'zod';

// controller for create a new user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const validatedData = validationSchema.parse(user);
    const result = await UserService.crateUserInDB(validatedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    // Handling the Zod error with a professional error message
    if (error instanceof z.ZodError) {
      res.status(500).json({
        success: false,
        message: `${
          error?.issues[0]?.message !== 'Required'
            ? `${error?.issues[0]?.code} : ${error?.issues[0]?.message}`
            : 'field is required! Please provide required data.'
        }`,
        error: error?.issues,
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: error,
      });
    }
  }
};

// controller for get all users from DB
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data : result
    });
  } catch (err: any) {
   res.status(500).json({
    success: false,
    message: err.message || "Something went wrong!",
    data : null
   })
  }
};

// controller for retrieve single user
const getSingleUser = async (req : Request, res : Response) =>{
try{

  const {userId} = req.params
  const singleUser = await UserService.getSingleUserFromDB(Number(userId))

  // validating if user does exist and data is null it will show a message
  if(singleUser){
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data : singleUser
    });
  }
  else{
    res.status(500).json({
      success: false,
      message: "User not Found!",
      data : singleUser 
     })
  }
} catch(error){
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong!",
    error : error
   })
}

 


}

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser
};
