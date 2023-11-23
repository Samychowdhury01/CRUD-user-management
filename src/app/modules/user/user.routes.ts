import express from 'express';
import { UserController } from './user.controller';

const router = express.Router()

// route for create a new user
router.post('/', UserController.createUser)

export const UserRouter = router