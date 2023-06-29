import 'dotenv/config';
import express, {Application} from 'express';
import ApiRouter from './api';
import GoogleAuthRouter from './api/googleAuth';
import cors from 'cors';
import connectToDB from './loaders/mongoose';
import cookieParser from 'cookie-parser';
import config from './config';

const { port } = config;
const app:Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api', ApiRouter);
app.use('/', GoogleAuthRouter);

app.listen(port,():void => {
    connectToDB();
    console.log(`Server is running on PORT ${port}`);
});