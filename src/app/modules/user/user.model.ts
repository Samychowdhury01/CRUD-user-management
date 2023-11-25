/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrderItem,
  TUser,
  IUserModel,
} from './user.interface';
import { NextFunction } from 'express';
import config from '../../config';
import bcrypt from 'bcrypt'


const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: String,
},  { _id: false });
const addressSchema = new Schema<TAddress>({
  street: String,
  city: String,
  country: String,
},  { _id: false });

// Define the Order schema
const orderSchema = new Schema<TOrderItem>({
  productName: String,
  price: Number,
  quantity: Number,
},  { _id: false });

// Define the User schema
const userSchema = new Schema<TUser>({
  userId: { type: Number, unique: true },
  username: String,
  password: String,
  fullName: fullNameSchema,
  age: Number,
  email: String,
  isActive: Boolean,
  hobbies: [String],
  address: addressSchema,
  orders: [orderSchema],
  isDeleted: Boolean,
});

// hashing passwords before save into DB
userSchema.pre('save', async function (next: NextFunction) {
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  next()
},

// middleware for aggregation pipelines
userSchema.pre('aggregate', async function (next: NextFunction) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
}));

// custom static method to check user exist or not
userSchema.statics.isUserExists = async function (userId: number) {
  const user = await User.findOne(
    { userId, isDeleted: {$ne : true} },
    { password: 0, isDeleted: 0, orders : 0 },
  );
  return user;
};

// user Model
export const User = model<TUser, IUserModel>('User', userSchema);
