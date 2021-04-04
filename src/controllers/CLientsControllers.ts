import { Request, Response } from 'express';
import { comparePassword, hashPassword } from '../helpers/passwordhelpers';
import Datahelpers from '../helpers/Datahelpers';
import { UsersInterface } from '../interfaces/UsersInterface';
import { UserModel } from '../models/UsersModel';
import { notifyNew } from '../utils/mails';

export class UserController {

    static getCostomers = async (req: Request, res: Response) => {
        try {
            const allUser: any = await UserModel.find({});
            res.status(200).send({ error: true, user: allUser });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
        }
    }
}

