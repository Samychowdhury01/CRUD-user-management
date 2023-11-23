// controller for create a new user

import { Request, Response } from 'express';
import { UserService } from './user.service';
import validationSchema from './user.validation';
import { z } from 'zod';

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
            : 'This field is required!'
        }`,
        error: error?.issues,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error,
      });
    }
  }
};
export const UserController = {
  createUser,
};
