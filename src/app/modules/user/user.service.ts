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

export const UserService = {
  crateUserInDB,
};
