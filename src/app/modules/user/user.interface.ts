import { Model } from 'mongoose';

// type  decelerating for Address
export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};
// type  decelerating for Order
export type TOrderItem = {
  productName: string;
  price: number;
  quantity: number;
};
// type  decelerating for User
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: Array<TOrderItem>;
  isDeleted: boolean
};

// creating a method to check the user exist or not
export interface IUserModel extends Model<TUser> {
  isUserExists(id: number): Promise<TUser | null>;
}
