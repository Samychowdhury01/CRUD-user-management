import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// route for create a new user
router.post('/', UserController.createUser);
// Retrieve all users from DB
router.get('/', UserController.getAllUsers);
// Retrieve single users from DB
router.get('/:userId', UserController.getSingleUser);
// Delete single users from DB
router.delete('/:userId', UserController.removeSingleUser);

export const UserRouter = router;
