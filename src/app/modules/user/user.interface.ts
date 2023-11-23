// type  decelerating for Address
export type TAddress = {
  street: string;
  city: string;
  country: string;
};
// type  decelerating for Order
export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};
// type  decelerating for User
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders: Array<TOrders>;
};
