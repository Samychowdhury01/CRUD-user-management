import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrderItem,
  TUser,
  IUserModel,
} from './user.interface';
import { NextFunction } from 'express';

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: String,
});
const addressSchema = new Schema<TAddress>({
  street: String,
  city: String,
  country: String,
});

// Define the Order schema
const orderSchema = new Schema<TOrderItem>({
  productName: String,
  price: Number,
  quantity: Number,
});

// Define the User schema
const userSchema = new Schema<TUser>({
  userId: { type: Number,  unique: true },
  username: String,
  password: String,
  fullName: fullNameSchema,
  age: Number,
  email: String,
  isActive: Boolean,
  hobbies: [String],
  address: addressSchema,
  orders: [orderSchema],
  isDeleted: Boolean
});


// middleware for aggregation pipelines
userSchema.pre('aggregate', function(next : NextFunction) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next()
})

// custom static method to check user exist or not
userSchema.statics.isUserExists = async function (userId: number) {
  const user = await User.findOne({ userId }, {password :0, orders : 0, isDeleted : 0});
  return user;
};

// user Model
export const User = model<TUser, IUserModel>('User', userSchema);
