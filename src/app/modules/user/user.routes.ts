import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// route for create a new user
router.post('/', UserController.createUser);
// Retrieve all users from DB
router.get('/', UserController.getAllUsers);
// Retrieve single users from DB
router.get('/:userId', UserController.getSingleUser);
// Update single users from DB
router.put('/:userId', UserController.updateUser);
// Delete single users from DB
router.delete('/:userId', UserController.removeSingleUser);
// Route for add a new product in order list
router.post('/:userId/orders', UserController.addProduct);
// Route for add a retrieve all item from order list
router.get('/:userId/orders', UserController.getOrderItems);
// Route for get the total price
router.get('/:userId/orders/total-price', UserController.calculateTotalPrice);

export const UserRouter = router;
