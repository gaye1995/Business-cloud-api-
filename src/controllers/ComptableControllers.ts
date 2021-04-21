import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { comparePassword, hashPassword } from '../helpers/passwordhelpers';
import Datahelpers from '../helpers/Datahelpers';
import { UsersInterface } from '../interfaces/UsersInterface';
import { UserModel } from '../models/UsersModel';
import { notifyNew } from '../utils/mails';
import * as jwt from '../middlewares/checkJwt';
import { updateLastLogin, updateUser } from '../helpers/checkFunction/editUser';
import { UserJSON } from '../utils/returnData'
import { ComptableModel } from '../models/ComptableModel';

export class ComptableController {
    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw { code: 400 };
            let User: any = await ComptableModel.findOne({email : email});
            // email doesn't existe 
            if (!User) throw { code: 402 }

            // verifier les tentatives de connexion
            const lastLogin = (Date.now() - User.lastLogin) / 1000;

            // Si l'utilisateur à respecter les deux minutes d'attente on remet sont nombres d'essai à 0
            if (User.attempt >= 5 && lastLogin > 300) await ComptableModel.updateOne({ _id: mongoose.Types.ObjectId(User._id)} ,{  $set: { lastLogin: Date.now(), attempt: User.attempt + 1 } });

            // On vérifie le nombre de connnexion et le temps depuis la dernière connexion
            if (User.attempt >= 5 && lastLogin < 300) throw new Error('Too many attempts on this email (5 max) - Please wait (5min)');

            if(!await comparePassword(password, User.password)){
                throw { code: 404}
            } 

            User = await jwt.getAuthToken(User);
            const dataUser: any = UserJSON(User);
            await updateLastLogin(User, true);
            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'The user has been successfully connected', user: User });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
            else if (err.code === 402) res.status(400).send({ error: true, message: 'An account using this email address does not exist' });
            else if (err.code === 404) res.status(409).send({ error: true, message: 'One of your data is incorrect' });
            else Datahelpers.errorHandler(res, err);
        }
    }

    static register = async (req: Request, res: Response) => {
        try {
            const { name, email, password, confirm , role, siret, societe } = req.body;
            req.body.lastLogin = 0;
            req.body.attempt = 0;
            if (!name || !email || !password || !role || !siret || !societe ) throw {code: 400};
            if (role != ('comptable').toLocaleLowerCase()) throw { code : 406}
            if(password != confirm ) throw {code: 407}
            if (!Datahelpers.checkEmail(email)) throw {code: 401};
            const User: any = await ComptableModel.findOne({email : email});
            // email existe 
            if (User) throw {code: 402}
            if (!Datahelpers.checkPassword(password)) throw {code: 403};
            req.body.password = await hashPassword(password);
            // if (phone && !Datahelpers.checkTel(phone)) throw {code: 404};
            // if (birthdayDate && !Datahelpers.checkDate(birthdayDate)) throw {code: 405};
            // Create user
            const user: any = await ComptableModel.create(req.body);
            const subject : string = 'Inscription'
            const content : string = 'Bienvenue sur le logiciel comptable Busines-Cloud'
            await notifyNew(user.email, subject, content );
            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'The user has been successfully created', user: { id: user.id, name: user.name, email: user.email } });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
            else if (err.code === 401) res.status(409).send({ error: true, message: 'One of your data is incorrect' });
            else if (err.code === 402) res.status(409).send({ error: true, message: 'An account using this email address is already registered' });
            else if (err.code === 403) res.status(409).send({ error: true, message: 'One of your data is incorrect' });
            else if (err.code === 404) res.status(400).send({ error: true, message: ' incorrect phone number' });
            else if (err.code === 405) res.status(400).send({ error: true, message: 'incorect format date' });
            else if (err.code === 406) res.status(401).send({ error: true, message: 'Seule les comptables peuvent s\'inscrire' });
            else if (err.code === 407) res.status(401).send({ error: true, message: 'Veuillez mettre le méme password sur confirm' });
            else Datahelpers.errorHandler(res, err);
        }

    } 
    static getUsers = async (req: Request, res: Response) => {
        try {
            const allUser : any = await ComptableModel.find();
            res.status(200).send({error: true, user: allUser });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
        }
    }
    // recuperation d'un comptable (user)
    static getOneUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const USER: any = await ComptableModel.findOne({_id : id});
            const user: any = UserJSON(USER);
            res.status(200).send({ error: false, user: user });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
        }
    }
    static updateUsers = async (req: Request, res: Response) => {
        try {
            const authorization: any = req.headers.authorization;
            const token = await jwt.getToken(authorization);
            const dataparams = await jwt.getJwtPayload(token);
            const  data = req.body;
            const subject : string = 'modification';
            const content : string = 'vous venez de modifier certains de vos données sur le logiciel comptable Busines-Cloud';
            const user: any = await ComptableModel.findOne({ email: dataparams.email });
            if (data.password && !Datahelpers.checkPassword(dataparams.password)) throw {code: 403};
            // req.body.password = await hashPassword(dataparams.password);
            if (data.phone && !Datahelpers.checkTel(data.phone)) throw {code: 404};
            if (data.birthdayDate && !Datahelpers.checkDate(data.birthdayDate)) throw {code: 405};
            console.log(user)
            await updateUser(user, data);
            await notifyNew(dataparams.email, subject, content);
            res.status(201).send({ error: true, message: 'user updated' })
        } catch (err) {
            if (err.code === 403) res.status(409).send({ error: true, message: 'One of your data is incorrect' });
            if (err.code === 404) res.status(400).send({ error: true, message: ' incorrect phone number' });
            if (err.code === 405) res.status(400).send({ error: true, message: 'incorect format date' });
        }
    }
    static forgetPassword = async (req: Request, res: Response) => {
        try {
            const {email} = req.body;
            console.log(email)
            if (!email) throw {code: 400};
            const user: any = await ComptableModel.findOne({email: email});
            if (user) {
                const subject: string = 'Demande de réinitialisation du mot de passe'
                const content: any = 'Nous avons reçu une demande pour réinitialiser le mot de passe pour votre compte Si vous avez demandé une réinitialisation, cliquez sur le bouton ci-dessous. Si vous n\'avez pas fait cette demande, veuillez ignorer cet email.'
                await notifyNew(user.email, subject, content)
                res.status(200).send({ error: false, message: 'an email has been sent to your email address' });
            } else { 
                throw { code: 401 }
            }
        } catch (err) {
            if (err.code === 400) res.status(409).send({ error: true, message: 'One or more mandatory data is missing' });
            else if (err.code === 401) res.status(409).send({ error: true, message: 'An account using this email address does not exist' });
        }
    }
    //deconnexion
    static deconnectUser = async (req: Request, res: Response) => {
    try{ 
        const authorization: any = req.headers.authorization;
        const token = await jwt.getToken(authorization);
        const dataparams = await jwt.getJwtPayload(token);
        const user: any = await ComptableModel.findOne({ email: dataparams.email });
        const deconnectCount = await ComptableModel.updateOne({ _id: mongoose.Types.ObjectId(user._id), email : user.email } ,{  $unset: {token : ""} });
        console.log(user);
        // const deconnectCount = await UserModel.deleteOne({ token: user.token });
        if(!deconnectCount){
            res.status(403).send({ error: false, message: 'Echec de la déconnection' });

        }else{
            res.status(200).send({ error: false, message: 'Vous avez été déconnecter avec succés' });
        }
    }catch(err){
        return err.console.error();
        
    }
      
} 
}

