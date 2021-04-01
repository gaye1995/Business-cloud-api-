import { Request, Response } from 'express';
import { comparePassword, hashPassword } from '../helpers/passwordhelpers';
import Datahelpers from '../helpers/Datahelpers';
import { Comptebq } from '../models/CompteBqModel';
import * as jwt from '../middlewares/checkJwt';
import { BanqueJSON } from '../utils/returnData'

export class BanqueController {
   
    static createBanque = async (req: Request, res: Response) => {
        try {
            const { libelle, libelleComptable, name, iban, bic, address, zip, city, country, firstname, lastname, email, phone, fax} = req.body;
            if (!libelle || !name || !iban || !bic || !address || !zip || !city || !country) throw {code: 400};
            if (!Datahelpers.checkIBan(iban) || !Datahelpers.checkBic(bic)) throw {code: 401};
            const banque: any = await Comptebq.findOne({name : name});
            // email existe 
            if (banque) throw {code: 402}
            req.body.iban = await hashPassword(iban);
            if (phone && !Datahelpers.checkTel(phone)) throw {code: 404};
            // Create account
            const Banque: any = await Comptebq.create(req.body);
            const DataBanque = BanqueJSON(Banque);
            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'The banc account has been successfully created', user: DataBanque});
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
            if (err.code === 401) res.status(409).send({ error: true, message: 'One of your data is incorrect' });
            if (err.code === 402) res.status(409).send({ error: true, message: 'An account using this email address is already registered' });
            if (err.code === 403) res.status(409).send({ error: true, message: 'One of your data is incorrect' });
            if (err.code === 404) res.status(400).send({ error: true, message: ' incorrect phone number' });
        }

    }
}