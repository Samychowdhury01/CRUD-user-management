
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

const getSingleUserFromDB = async (userId:number) => {
  const result = await User.isUserExists(userId)
  console.log(result);
  return result
}

export const UserService = {
  crateUserInDB,
  getAllUserFromDB,
  getSingleUserFromDB,
};
