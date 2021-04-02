import { Request, Response } from 'express';
import Datahelpers from '../helpers/Datahelpers';
import { Comptebq } from '../models/CompteBqModel';
import * as jwt from '../middlewares/checkJwt';
import { BanqueJSON } from '../utils/returnData'

export class BanqueController {
   
    static createBanque = async (req: Request, res: Response) => {
        try {
            const { libelle, libelleComptable, name, iban, bic, address, zip, city, country, firstname, lastname, email, phone, fax} = req.body;
            const banque: any = await Comptebq.findOne({iban : iban});
            if (!libelle || !name || !iban || !bic || !address || !zip || !city || !country) throw { code: 400 };
            // if (Datahelpers.checkBic(bic)) throw {code: 401};
            // if (Datahelpers.checkIban(iban)) throw {code: 402};
            if (email && !Datahelpers.checkEmail(email)) throw {code: 403};
            if (phone && !Datahelpers.checkTel(phone)) throw {code: 404};

            if (banque) throw { code: 401 };
            const banqueData : any = await Comptebq.create(req.body);
            console.log(banqueData);
            res.status(200).send({ error: false, message: 'The user has been successfully created', banque: banqueData });
            } catch (err) {
                if (err.code === 400) res.status(400).send({ error: true, message: 'An account using this iban is already registered' });
                if (err.code === 401) res.status(400).send({ error: true, message: 'An account using this iban is already registered' });
                if (err.code === 402) res.status(400).send({ error: true, message: 'An account using this iban is already registered' });
                if (err.code === 403) res.status(409).send({ error: true, message: 'One of your data is incorrect' });
                if (err.code === 404) res.status(400).send({ error: true, message: ' incorrect phone number' });
            }

    }
}