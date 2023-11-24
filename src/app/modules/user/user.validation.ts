import { z } from 'zod';

const fullNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const orderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

// schema for zod validation
const validationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: fullNameSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressSchema,
  orders: z.array(orderSchema).optional(),
  isDeleted: z.boolean().optional().default(false),
});

// validation for update user data

export const updateUserSchema = z.object({
  userId: z.number().optional(), 
  username: z.string().optional(),
  password: z.string().optional(),
  fullName: fullNameSchema.optional(),
  age: z.number().optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
  }),
  orders: z.array(orderSchema).optional(),
  isDeleted: z.boolean().optional(),
});

export default validationSchema;
