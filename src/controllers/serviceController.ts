import { Request, Response } from 'express';
import Datahelpers from '../helpers/Datahelpers';
import { Service } from '../models/ServiceModel';

export class ServiceController {
static createService = async (req: Request, res: Response) => {
    try {
        // Récupération de toutes les données du body
        const { name, accountNumber,nbheure, price } = req.body;

        // Vérification de si toutes les données nécessaire sont présentes
        if (!name || accountNumber === undefined || price === undefined || !nbheure ) throw {code : 400};

        // Vérification de la validité du prix
        if (!Datahelpers.validPrice(price)) throw {code : 401};
        req.body.price = Datahelpers.validPrice(price);

        // Création de l'article
        const service: any = await Service.create(req.body);

        // Envoi de la réponse
        res.status(200).send({ error: false, message: 'service successfully created', service: service });
    } catch (err) {
        if (err.code === 400)  res.status(400).send({ error: true, message: 'Une des données important sont manquants' });
        else if (err.code === 401)  res.status(400).send({ error: true, message: 'veuillez saisir un prix valide' });
        else Datahelpers.errorHandler(res, err);
    }
}
}
