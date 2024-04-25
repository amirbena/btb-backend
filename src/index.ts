import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db/connect';
import cookieParser from 'cookie-parser';
import userController from './users/user.router';
import rickMortyController from './rickmorty/rickMorty.controller';


dotenv.config({ path: `${process.cwd()}/environments/.${process.env.NODE_ENV}.env` });
const app = express();

app.use(cors({ origin: process.env.ORIGIN_URI, credentials: true, preflightContinue: true }))
app.use(cookieParser());
app.use(bodyParser.json());


connectDB();

app.use('/user', userController);
app.use('/rickMorty', rickMortyController);

app.get('/', (req, res) => {
    res.send('Hello from Express with TypeScript!');
});

const port = process.env.PORT || 3000; // Use environment variable for port

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
