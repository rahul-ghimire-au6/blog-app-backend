import express from 'express';
import * as dotenv from "dotenv";
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import blogRoute from './routes/blogRoutes';
import commentRoute from './routes/commentRoutes'

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    cors({
        origin: "*",
        methods: "GET,POST,PUT,DELETE,PATCH",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true
    })
);

require("./config/dbSetting");

app.use('/user',userRouter);
app.use('/blog',blogRoute);
app.use('/comment',commentRoute);

export default app;