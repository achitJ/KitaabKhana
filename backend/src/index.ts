import 'dotenv/config';
import express, {Application} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToDB from './loaders/mongoose';
import config from './config';
import ApiRouter from './api';
import GoogleAuthRouter from './api/googleAuth';

const { port, clientURI } = config;
const app:Application = express();

app.use(cors({
    origin: clientURI,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api', ApiRouter);
app.use('/', GoogleAuthRouter);

app.listen(port,():void => {
    connectToDB();
    console.log(`Server is running on PORT ${port}`);
});