import { TUser } from './user.interface';
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

  if(!result){
    throw { code: 404, description: "User not found!" };
  }

  return result;
};

// Delete user from DB
const deleteUserFromDB = async (userId: number) => {
  const isUserExist = await User.isUserExists(userId);
  if (isUserExist) {
    const result = await User.updateOne({ userId }, { isDeleted: true });
    return result;
  } else {
    throw { code: 404, description: "User not found!" };;
  }
};
export const UserService = {
  crateUserInDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
