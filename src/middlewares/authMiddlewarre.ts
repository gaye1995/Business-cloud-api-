import express, { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { config } from 'dotenv';
import { UserModel } from '../models/UsersModel';

config();

const JWT_KEY: string = process.env.JWT_KEY as string;

const middlewareAuth: express.Application = express();

// récupération tu token du l'utilisateur
middlewareAuth.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('ttoto');

        // Récupération du token
        const token = req.header('Authorization')?.replace('Bearer ','') as string;
        console.log(token);
        if (!token) throw { code : 400};

        // Vérification du token et des informations contenue à l'intérieur
        const data: any = jsonwebtoken.verify(token, JWT_KEY);
        console.log(data);
        if (!data || !data.email || !data._id) throw {code : 401}

        // Récupération de l'utilisateur pour le mettre dans le req et y avoir dans les routes après
        const user : any = await UserModel.findOne({email: data.email});
        if (!user) throw {code : 402};
        Object.assign(req, { user });

        // Si tout se passe bien suite de la requête
        next();
    } catch (erreur) {
        console.log(erreur);
        if (erreur.code === 400 ) res.status(400).send({ error: true, message: 'err.message '});
        if (erreur.code === 401) res.status(400).send({ error: true, message: 'err.message jwt expire '});
    }
});

export { middlewareAuth as authMiddleware };