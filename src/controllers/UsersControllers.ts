import { Request, Response } from 'express';
import { comparePassword, hashPassword } from '../helpers/passwordhelpers';
import Datahelpers from '../helpers/Datahelpers';
import { UsersInterface } from '../interfaces/UsersInterface';
import { UserModel } from '../models/UsersModel';
import { notifyNew } from '../utils/mails';
import * as jwt from '../middlewares/checkJwt';
import { updateUser } from '../helpers/checkFunction/editUser';

export class UserController {
    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            console.log(email);
            if (!email || !password) throw { code: 400 };
            let User: any = await UserModel.findOne({email : email});
            console.log(User);
            // email doesn't existe 
            if (!User) throw { code: 402 }
            if(!await comparePassword(password, User.password)) throw { code: 404}
            User = await jwt.getAuthToken(User);
            // console.log(User);
            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'The user has been successfully connected', user: { id: User.id, name: User.name, email: User.email,token: User.token } });
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
            console.log(email);
            console.log(password);
            // email existe 
            if (User) throw {code: 402}
            if (!Datahelpers.checkPassword(password)) throw {code: 403};
            req.body.password = await hashPassword(password);
            if (phone && !Datahelpers.checkTel(phone)) throw {code: 404};
            if (birthdayDate && !Datahelpers.checkDate(birthdayDate)) throw {code: 405};
            // Create user
            const user: any = await UserModel.create(req.body);
            const subject : string = 'Inscription'
            const content : string = 'Bienvenue sur le logiciel comptable Busines-Cloud'
            await notifyNew(user.email, subject, content );
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
            const subject: string = 'Demande de réinitialisation du mot de passe'
            const content: string = 'Nous avons reçu une demande pour réinitialiser le mot de passe pour votre compte Si vous avez demandé une réinitialisation, cliquez sur le bouton ci-dessous. Si vous n\'avez pas fait cette demande, veuillez ignorer cet email.'
            const { email } = req.body;
            if (!email) throw { code: 400 };
            // Récupération de l'utilisateur si il existe, on envoie le mail
            const user: any = await UserModel.findOne({ email });
            if (user) {
                notifyNew(user.email, subject, content)
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
            const  email  = req.params;
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
            const  {data}: any  = req.body;
            const user: any = await UserModel.findOne({ email: data.email });
            await updateUser(user, { ...data });
        } catch (err) {
        }
    }
}
