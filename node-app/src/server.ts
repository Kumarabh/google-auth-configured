import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/db';

dotenv.config({path: './config/.env'});
connectDB();

import { authenticationWithGoogle, verifyToken } from './services/auth.service';
import { userRoutes } from './routes/user.route';
import { authRoutes } from './routes/auth.route';

app.use(bodyParser.json());
app.use(cors({origin: '*'}));

app.use('/auth', authRoutes);
app.use('/signInWithGoogle', authenticationWithGoogle);
app.use('/api/v1/users', verifyToken, userRoutes);

app.listen(process.env.PORT, () => console.log(`Server is listening at port ${process.env.PORT}`));
