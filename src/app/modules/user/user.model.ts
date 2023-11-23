import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrderItem,
  TUser,
  IUserModel,
} from './user.interface';

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  lastName: { type: String, required: true },
});
const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

// Define the Order schema
const orderSchema = new Schema<TOrderItem>({
  productName: String,
  price: Number,
  quantity: Number,
});

// Define the User schema
const userSchema = new Schema<TUser>({
  userId: { type: Number, required: [true, 'Why no bacon?'], unique: true },
  username: String,
  password: String,
  fullName: fullNameSchema,
  age: Number,
  email: String,
  isActive: Boolean,
  hobbies: [String],
  address: addressSchema,
  orders: [orderSchema],
});

// custom static method to check user exist or not
userSchema.statics.isUserExists = async function (id: number) {
  const user = await User.findOne({ id });
  return user;
};

// user Model
export const User = model<TUser, IUserModel>('User', userSchema);
