/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TOrderItem, TUser } from './user.interface';
import { User } from './user.model';

// save a new user to DB
const crateUserInDB = async (user: TUser) => {
  const createdUser = await User.create(user);
  if (createdUser) {
    const { password, ...restUserData } = createdUser.toObject();
    return restUserData;
  }
};

// retrieve data from DB
const getAllUserFromDB = async () => {
  const result = await User.aggregate([
    {
      $match: {},
    },
    {
      $project: {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

// Get a single user from DB
const getSingleUserFromDB = async (userId: number) => {
  const result = await User.isUserExists(userId);
  if (!result) {
    throw { code: 404, description: 'User not found!' };
  }
  return result;
};

// Update user details
const updateUserData = async (userId: number, userUpdatedData: any) => {
  const isUserExist = await User.isUserExists(userId);

  if (isUserExist) {
    const updatedUser = await User.findOneAndUpdate(
      { userId, isDeleted: { $ne: true } },
      { $set: userUpdatedData },
      { new: true, projection: { password: 0, orders: 0, isDeleted: 0 } }, // Excluding password from the response
    );
    return updatedUser;
  } else {
    throw { code: 404, description: 'User not found!' };
  }
};
// Delete user from DB
const deleteUserFromDB = async (userId: number) => {
  const isUserExist = await User.isUserExists(userId);
  if (isUserExist) {
    const result = await User.updateOne({ userId }, { isDeleted: true });
    return result;
  } else {
    throw { code: 404, description: 'User not found!' };
  }
};

// add a product in orders list in DB
const addProductIntoDB = async (userId: number, orderItem: TOrderItem) => {
  const isUserExist = await User.isUserExists(userId);
  if (isUserExist) {
    const result = User.updateOne(
      { userId, isDeleted: { $ne: true } },
      { $addToSet: { orders: orderItem } },
    );
    return result;
  } else {
    throw { code: 404, description: 'User not found!' };
  }
};

// get the orders item
const getOrderItemsFromDB = async (userId: number) => {
  const isUserExist = await User.isUserExists(userId);
  if (isUserExist) {
    const result = await User.aggregate([
      {
        $match: { userId },
      },
      {
        $project: {
          orders: 1,
          _id: 0,
        },
      },
    ]);
    return result;
  } else {
    throw { code: 404, description: 'User not found!' };
  }
};

// calculate total price of order items
const calculateTotalPriceFromDB = async (userId: number) => {
  const isUserExist = await User.isUserExists(userId);

  if (isUserExist) {
    
      const totalPrice = await User.aggregate([
        {
          $match: { userId },
        },
        {
          $unwind: '$orders',
        },
        {
          $group: { _id: null, totalPrice: { $sum: '$orders.price' } },
        },
        {
          $project: {
            totalPrice: 1,
            _id: 0,
          },
        },
      ]);

      const parsedTotalPrice = parseFloat(totalPrice[0]?.totalPrice.toFixed(2))
      
      return isNaN(parsedTotalPrice) ? {totalPrice : 0} : parsedTotalPrice;
    
    
  } else {
    throw { code: 404, description: 'User not found!' };
  }
};

export const UserService = {
  crateUserInDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserData,
  deleteUserFromDB,
  addProductIntoDB,
  getOrderItemsFromDB,
  calculateTotalPriceFromDB,
};
