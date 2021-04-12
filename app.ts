import { config } from 'dotenv';
config();
require('./database/Db');
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { AllRoute } from './src/routes';
import bodyParser from 'body-parser';

const port: string | undefined = process.env.PORT;

const app: express.Application = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


app.use((error: any, request: Request, response: Response, next: NextFunction) => {
    if (error !== null) {
        return response.status(400).json({ success: false, message: 'Invalid json' });
    }
    return next();
});
app.use(AllRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
