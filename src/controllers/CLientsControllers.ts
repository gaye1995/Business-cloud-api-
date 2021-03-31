import { Request, Response } from 'express';
import { comparePassword, hashPassword } from '../helpers/passwordhelpers';
import Datahelpers from '../helpers/Datahelpers';
import { UsersInterface } from '../interfaces/UsersInterface';
import { UserModel } from '../models/UsersModel';
import { notifyNew } from '../utils/mails';

export class UserController {
    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw { code: 400 };
            const User: any = await UserModel.findOne({email : email});
            // email doesn't existe 
            if (!User) throw { code: 402 }
            if(!await comparePassword(password, User.password)) throw { code: 404}

            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'The user has been successfully connected', user: { id: User.id, name: User.name, email: User.email } });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
            if (err.code === 402) res.status(409).send({ error: true, message: 'An account using this email address does not exist' });
            if (err.code === 404) res.status(409).send({ error: true, message: 'One of your data is incorrect' });
        }
    }

    static register = async (req: Request, res: Response) => {
        try {
            const { name, email, password, phone, birthdayDate, numSIRET, numRCS } = req.body;
            if (!name || !email || !password) throw {code: 400};
            if (!Datahelpers.checkEmail(email)) throw {code: 401};
            const User: any = await UserModel.findOne({email : email});
            console.log(User);
            // email existe 
            if (User) throw {code: 402}
            if (!Datahelpers.checkPassword(password)) throw {code: 403};
            req.body.password = await hashPassword(password);
            if (phone && !Datahelpers.checkTel(phone)) throw {code: 404};
            if (birthdayDate && !Datahelpers.checkDate(birthdayDate)) throw {code: 405};
            // Create user
            const user: any = await UserModel.create(req.body);
            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'The user has been successfully created', user: { id: user.id, name: user.name, email: user.email } });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
            if (err.code === 401) res.status(409).send({ error: true, message: 'One of your data is incorrect' });
            if (err.code === 402) res.status(409).send({ error: true, message: 'An account using this email address is already registered' });
            if (err.code === 403) res.status(409).send({ error: true, message: 'One of your data is incorrect' });
            if (err.code === 404) res.status(400).send({ error: true, message: ' incorrect phone number' });
            if (err.code === 405) res.status(400).send({ error: true, message: 'incorect format date' });
        }

    }

}
