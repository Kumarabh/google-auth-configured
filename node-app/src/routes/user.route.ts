import express from 'express';
import {getAllUsers, createUser, updateUser, deleteUser, getUserById} from '../controllers/user.controller';
const userRoutes = express.Router();

userRoutes.route('/')
.get(getAllUsers)
.post(createUser)
.put(updateUser)

userRoutes.route('/:id')
.get(getUserById)
.delete(deleteUser)

export { userRoutes }

