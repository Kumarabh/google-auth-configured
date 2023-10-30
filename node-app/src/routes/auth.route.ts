import express from 'express';
import { signIn, signUp } from '../services/auth.service';
const authRoutes = express.Router();

authRoutes.route('/signIn').post(signIn)
authRoutes.route('/signUp').post(signUp)

export { authRoutes }