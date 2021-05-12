import { Request, Response } from 'express';
import Datahelpers from '../helpers/Datahelpers';
import { Comptebq } from '../models/CompteBqModel';
import mongoose from 'mongoose';
import { BanqueJSON } from '../utils/returnData'
import { updateBanque } from '../helpers/checkFunction/editBill';

export class BanqueController {
    static createBanque = async (req: Request, res: Response) => {
        try {
            const { libelle, libelleComptable, name, iban, bic, address, zip, city, country, firstname, lastname, email, phone, fax} = req.body;
            if (!libelle || !name || !iban || !bic || !address || !zip || !city || !country) throw { code: 400 };
            if (!Datahelpers.checkBic(bic)) throw {code: 401};
            if (!Datahelpers.checkIban(iban)) throw {code: 402};
            if (email && !Datahelpers.checkEmail(email)) throw {code: 403};
            if (phone && !Datahelpers.checkTel(phone)) throw {code: 403};
            const banque: any = await Comptebq.findOne({iban : iban});
            if (banque) throw { code: 401 };
            const banqueData : any = await Comptebq.create(req.body);
            console.log(banqueData);
            res.status(201).send({ error: false, message: 'Votre compte a bien été créé avec succès', banque: banqueData });
            } catch (err) {
                if (err.code === 400) res.status(400).send({ error: true, message: 'An account using this iban is already registered' });
                if (err.code === 401) res.status(400).send({ error: true, message: 'Please check an valid BIC ' });
                if (err.code === 402) res.status(400).send({ error: true, message: 'Please check an valid IBAN ' });
                if (err.code === 403) res.status(409).send({ error: true, message: 'One of your data is incorrect' });
                else Datahelpers.errorHandler(res, err);
            }
    }
    static deleteBanque = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const banque: any = await Comptebq.findOne({_id: mongoose.Types.ObjectId(id)});
            if (!banque) throw { code: 401 };
            const deletebq : any = await Comptebq.deleteOne(banque);
            if(!deletebq) throw {code: 400}
            res.status(200).send({ error: false, message: 'The account has been successfully deleted'});
            } catch (err) {
                if (err.code === 400) res.status(400).send({ error: true, message: 'failled to delete' });
                else Datahelpers.errorHandler(res, err);
            }

    }
    static listeBanque = async (req: Request, res: Response) => {
        console.log('fghjk')
        try {
            console.log('fghjk')
            const banque: any = await Comptebq.find({});
            console.log(banque)
            if (!banque) throw { code: 401 };
            res.status(200).send({ error: false, message: 'liste des comptes ', banque: banque });
        } catch (err) {
            if (err.code === 401) res.status(400).send({ error: true, message: 'il n\'y a pas de compte enrégistré' });
            else Datahelpers.errorHandler(res, err);
        }

    }
    static getOneBanque = async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const banque: any = await Comptebq.find({_id: mongoose.Types.ObjectId(id)});
            console.log(banque)
            if (!banque) throw { code: 401 };
            res.status(200).send({ error: false, message: 'banque ', banque : banque});
            } catch (err) {
                if (err.code === 401) res.status(400).send({ error: true, message: 'il n\'y a pas de compte enrégistré' });
                else Datahelpers.errorHandler(res, err);
            }

    }
    static updateBanque = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            console.log(id)
            if(!id) throw {code : 400}
            const { name, iban, bic, address, zip, city, country, firstname, lastname, email, phone, fax} = req.body;
            if (bic && !Datahelpers.checkBic(bic)) throw {code: 401};
            if (iban && !Datahelpers.checkIban(iban)) throw {code: 402};
            if (email && !Datahelpers.checkEmail(email)) throw {code: 403};
            if (phone && !Datahelpers.checkTel(phone)) throw {code: 403};
            const banque: any = await Comptebq.findOne({_id: mongoose.Types.ObjectId(id)});
            console.log(banque)
            if (!banque) throw { code: 401 };
            console.log(banque);
            await updateBanque(banque,req.body);
            res.status(201).send({ error: false, message: 'Votre compte a bien été update '});
            } catch (err) {
                if (err.code === 400) res.status(400).send({ error: true, message: 'l\'attribut id est manquant' });
                else Datahelpers.errorHandler(res, err);
            }
    }
}