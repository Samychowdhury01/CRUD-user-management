import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import validationSchema, { orderSchema, updateUserSchema } from './user.validation';


// controller for create a new user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
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
    next(error)
  }
};

// controller for get all users from DB
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

// controller for retrieve single user
const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const singleUser = await UserService.getSingleUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: singleUser,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const userUpdatedData = req.body;

    const validatedUserData = updateUserSchema.parse(userUpdatedData)

    const result = await UserService.updateUserData(Number(userId), validatedUserData)
    res.status(200).json({
      success: true,
      message: 'User Data Updated Successfully!',
      data: result,
    });

  } catch (error) {
    next(error);
  }
};

// controller for Delete user
const removeSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const deletedUser = await UserService.deleteUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// controller for add product in order list
const addProduct =async (req: Request, res: Response, next: NextFunction) => {
try{
const {userId} = req.params
const product = req.body
const orderItem = orderSchema.parse(product)

const result = await UserService.addProductIntoDB(Number(userId), orderItem)
res.status(200).json({
  success : true,
  message : "Order created successfully!",
  data: null
})
}
catch(error){
  next(error)
}
}
export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  removeSingleUser,
  addProduct,
};
