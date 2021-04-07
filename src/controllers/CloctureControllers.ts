import { Request, Response } from 'express';
import Datahelpers from '../helpers/Datahelpers';
import { ActifInterface } from '../interfaces/BilanInterface';
import { Actif } from '../models/ActifModel';
import { UserExpense } from '../models/DepenseModel';
import { Passif } from '../models/PassifModel';

export class CloctureController {
    static createBilanActif = async (req: Request, res: Response) => {
        try {
            const { actifDate } = req.body;
            if (!actifDate && !Datahelpers.checkDate(actifDate)) throw {code: 405};
            req.body.actifImmobilisee = [];
            req.body.creance = [];
            req.body.disponibilite = [];
            req.body.totalTTC = 0;
            const actif : any = await Actif.create(req.body);
            console.log(actif);
            res.status(200).send({ error: false, message: 'Actif Bilan created', actif: { immobilisation: actif.immobilisation, date: actif.actifDate ,disponibilite : actif.disponibilite } });
        } catch (err) {
            if (err.code === 405) console.log('incorect format date' );
        }
    }

    static createBilanPassif = async (req: Request, res: Response) => {
        try {
            req.body.expense = [];
            req.body.totalPassif = 0;
            console.log(req.body);
            const actif : any = await Passif.create(req.body);    
            res.status(200).send({ error: false, message: 'Passif Bilan created', actif: { expense: actif.expense, date: actif.totalPassif } });
        } catch (err) {
            if (err.code === 405) console.log('incorect format date' );
        }
    } 
    static createCharge = async (req: Request, res: Response) => {
        try {
            req.body.expense = [];
            req.body.totalPassif = 0;
            console.log(req.body);
            const actif : any = await Passif.create(req.body);    
            res.status(200).send({ error: false, message: 'Passif Bilan created', actif: { expense: actif.expense, date: actif.totalPassif } });
        } catch (err) {
            if (err.code === 405) console.log('incorect format date' );
        }
    }
    static createProduit = async (req: Request, res: Response) => {
        try {
            req.body.expense = [];
            req.body.totalPassif = 0;
            console.log(req.body);
            const actif : any = await Passif.create(req.body);    
            res.status(200).send({ error: false, message: 'Passif Bilan created', actif: { expense: actif.expense, date: actif.totalPassif } });
        } catch (err) {
            if (err.code === 405) console.log('incorect format date' );
        }
    } 
}