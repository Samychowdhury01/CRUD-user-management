import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import validationSchema from './user.validation';
import { z } from 'zod';

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
    // Handling the Zod error with a professional error message
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: `${
          error?.issues[0]?.message !== 'Required'
            ? `${error?.issues[0]?.code} : ${error?.issues[0]?.message}`
            : 'field is required! Please provide required data.'
        }`,
        error: error?.issues,
      });
    } else {
      next(error);
    }
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
    const userUpdatedData = req.body
    const result = await UserService.updateUserData()
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

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  removeSingleUser,
};
