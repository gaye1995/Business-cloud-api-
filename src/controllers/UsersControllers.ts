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
            await notifyNew(User.email);
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
            await notifyNew(user.email);
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
    static resetPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            if (!email) throw { code: 400 };
            // Récupération de l'utilisateur si il existe, on envoie le mail
            const user = await UserModel.findOne({ email });
            if (user) {
                res.status(200).send({ error: false, message: 'an email has been sent to your email address' });
            } else {
            res.status(404).send({ error: false, message: 'Email does not exist' });
            }
        } catch (err) {
            console.log(err);
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
        }
    }
    static getUsers = async (req: Request, res: Response) => {
        try {
            const {  email } = req.params;
            console.log(email);
            // if (!data) throw { code: 400 };
            const user: any = await UserModel.findOne({ email });
            if(user) {
                res.status(200).send({ error: false, message: 'Details user', user: { name: user.name, email: user.email, phone: user.phone, avatar: user.avatar } });
            } else {
            res.status(404).send({ error: false, message: 'Email does not exist' });
            }
        } catch (err) {
            console.log(err);
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
        }
    }
    static updateUsers = async (req: Request, res: Response) => {
        try {
            
        } catch (err) {
        }
    }
}
