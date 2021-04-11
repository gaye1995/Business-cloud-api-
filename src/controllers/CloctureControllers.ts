import { Request, Response } from 'express';
import { updateActif } from '../helpers/checkFunction/editBill';
import Datahelpers from '../helpers/Datahelpers';
import { ArticleInterface } from '../interfaces/ArticleInterface';
import { ActifArticleInterface, ActifInterface } from '../interfaces/BilanInterface';
import { Actif } from '../models/ActifModel';
import { Article } from '../models/ArticleModel';
import { Charge } from '../models/ChargeModel';
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
            const charge : any = await Charge.create(req.body);    
            res.status(200).send({ error: false, message: 'Charge des compte de resultat  created', actif: { expense: charge.expense } });
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
    static updateActif = async (req: Request, res: Response) => {
        try {
            // Récupération de toutes les données du body
            const { id, articles} = req.body;
            // console.log(articles);
            // Vérification de si toutes les données nécessaire sont présentes
            if (!id) throw new Error('Missing id field');

            // Vérification de si la facture existe
            const actif: any = await Actif.findOne({_id: id});
            if (!actif) throw new Error('Invalid bill id');

            const articleFind: any = await Article.findOne({ _id: articles});
            console.log(articleFind);
            if (!articleFind) throw new Error('Invalid article id');
            // Création des données existante à modifier
            const UpdateData: any = {};

            if (articleFind) UpdateData.immobilisation = actif.immobilisation = articleFind;
           

            // Modification de la facture
            await updateActif(id, UpdateData);

            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'actif successfully updated',actif : actif});
        } catch (err) {
        
        }
    }
    static updatePassif = async (req: Request, res: Response) => {
        try {
            // Récupération de toutes les données du body
            const { id, articles} = req.body;
            // console.log(articles);
            // Vérification de si toutes les données nécessaire sont présentes
            if (!id) throw new Error('Missing id field');

            // Vérification de si la facture existe
            const actif: any = await Actif.findOne({_id: id});
            if (!actif) throw new Error('Invalid bill id');

            const articleFind: any = await Article.findOne({ _id: articles});
            console.log(articleFind);
            if (!articleFind) throw new Error('Invalid article id');
            // Création des données existante à modifier
            const UpdateData: any = {};

            if (articleFind) UpdateData.immobilisation = actif.immobilisation = articleFind;
           

            // Modification de la facture
            await updateActif(id, UpdateData);

            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'actif successfully updated',actif : actif});
        } catch (err) {
        
        }
    }
    static updateCharge = async (req: Request, res: Response) => {
        try {
            // Récupération de toutes les données du body
            const { id, expenses } = req.body;
            // console.log(articles);
            // Vérification de si toutes les données nécessaire sont présentes
            if (!id) throw new Error('Missing id field');

            // Vérification de si la facture existe
            const actif: any = await Actif.findOne({_id: id});
            if (!actif) throw new Error('Invalid bill id');

            const expenseFind: any = await UserExpense.findOne({ _id: expenses});
            console.log(expenseFind);
            if (!expenseFind) throw new Error('Invalid article id');
            // Création des données existante à modifier
            const UpdateData: any = {};

            if (expenseFind) UpdateData.immobilisation = actif.immobilisation = expenseFind;
           

            // Modification de la facture
            await updateActif(id, UpdateData);

            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'actif successfully updated',actif : actif});
        } catch (err) {
        
        }
    }
    static updateProduit = async (req: Request, res: Response) => {
        try {
            // Récupération de toutes les données du body
            const { id, articles} = req.body;
            // console.log(articles);
            // Vérification de si toutes les données nécessaire sont présentes
            if (!id) throw new Error('Missing id field');

            // Vérification de si la facture existe
            const actif: any = await Actif.findOne({_id: id});
            if (!actif) throw new Error('Invalid bill id');

            const articleFind: any = await Article.findOne({ _id: articles});
            console.log(articleFind);
            if (!articleFind) throw new Error('Invalid article id');
            // Création des données existante à modifier
            const UpdateData: any = {};

            if (articleFind) UpdateData.immobilisation = actif.immobilisation = articleFind;
           

            // Modification de la facture
            await updateActif(id, UpdateData);

            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'actif successfully updated',actif : actif});
        } catch (err) {
        
        }
    }


}