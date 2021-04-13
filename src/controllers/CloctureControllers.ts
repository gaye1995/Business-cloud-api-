import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { updateActif } from '../helpers/checkFunction/editBill';
import Datahelpers from '../helpers/Datahelpers';
import { ArticleInterface } from '../interfaces/ArticleInterface';
import { ActifArticleInterface, ActifBillInterface, ActifInterface } from '../interfaces/BilanInterface';
import { Actif } from '../models/ActifModel';
import { Article } from '../models/ArticleModel';
import { Bill } from '../models/BillModel';
import { Charge } from '../models/ChargeModel';
import { UserExpense } from '../models/DepenseModel';
import { Passif } from '../models/PassifModel';
import { insertActifOfCreance, insertActifOfImmo, insertChargeOfExpense } from '../utils/insertData';
import { ArticleJSON } from '../utils/returnData';

export class CloctureController {
    // Création de l'actif du bilan
    static createBilanActif = async (req: Request, res: Response) => {
        try {
            // recupération de la date
            const { actifDate } = req.body;
            //verification du format de la date
            if (!actifDate && !Datahelpers.checkDate(actifDate)) throw {code: 405};
            req.body.actifImmobilisee = [];
            req.body.creance = [];
            req.body.disponibilite = [];
            req.body.totalTTC = 0;
            // insertion des données
            const actif : any = await Actif.create(req.body);
            // réponse attendu
            res.status(200).send({ error: false, message: 'Actif Bilan created', actif: { immobilisation: actif.immobilisation, date: actif.actifDate ,disponibilite : actif.disponibilite } });
        } catch (err) {
            if (err.code === 405) console.log('incorect format date' );
        }
    }

    // Création du passif du bilan
    static createBilanPassif = async (req: Request, res: Response) => {
        try {
            // recupération de la date
            const { passifDate } = req.body;
            //verification du format de la date
            if (!passifDate && !Datahelpers.checkDate(passifDate)) throw {code: 405};
            // initialisation des données
            req.body.expense = [];
            req.body.totalPassif = 0;
            console.log(req.body);
            // création des données
            const actif : any = await Passif.create(req.body);
            // réponse attendu    
            res.status(200).send({ error: false, message: 'Passif Bilan created', actif: { expense: actif.expense, date: actif.totalPassif } });
        } catch (err) {
            if (err.code === 405) res.status(402).send({error: true, message: 'incorect format date' });
            else Datahelpers.errorHandler(res, err);

        }
    } 
    // création de charge de compte de resultat
    static createCharge = async (req: Request, res: Response) => {
        try {
            // recupération de la date
            const { chargeDate } = req.body;
            //verification du format de la date
            if (!chargeDate && !Datahelpers.checkDate(chargeDate)) throw {code: 405};
            // initialisation des données
            req.body.expense = [];
            req.body.totalPassif = 0;
            console.log(req.body);
            // création des données
            const charge : any = await Charge.create(req.body);    
            // réponse attendu    
            res.status(200).send({ error: false, message: 'Charge des compte de resultat  created', charge: { expense: charge.expense } });
        } catch (err) {
            if (err.code === 405) console.log('incorect format date' );
            else Datahelpers.errorHandler(res, err);
        }
    }
    // création du produit de compte de resultat
    static createProduit = async (req: Request, res: Response) => {
        try {
            // recupération de la date
            const { chargeDate } = req.body;
            //verification du format de la date
            if (!chargeDate && !Datahelpers.checkDate(chargeDate)) throw { code: 405 };
            // initialisation des données
            req.body.expense = [];
            req.body.totalProduit = 0;
            // création des données
            const charge: any = await Charge.create(req.body);
            // réponse attendu    
            res.status(200).send({ error: false, message: 'Charge des compte de resultat  created', charge: { expense: charge.expense } });
        } catch (err) {
            if (err.code === 405) console.log('incorect format date');
            else Datahelpers.errorHandler(res, err);
        }
    }
    static updateActif = async (req: Request, res: Response) => {
        try {
            // Récupération de toutes les données du body
            const { id, immobilisation , creance } = req.body;
            if (!id) throw { code:400 } ;

            // recherche de l'actif
            const actif: any = await Actif.findOne({ _id: id });
            if (!actif) throw { code : 401 };
            const creanceA : any = await insertActifOfCreance(actif, creance);
            const immoA : any = await insertActifOfImmo(actif, immobilisation);
            // réponse  
            res.status(200).send({ error: false, message: 'actif successfully updated', actif: creanceA ,});
        } catch (err) {
            if (err.code === 400) res.status(401).send({ error: true, message: 'Champs id manquant' });
            if (err.code === 401) res.status(401).send({ error: true, message: 'L\'actif que vous avez indiquez est inexistant ' });
            if (err.code === 402) res.status(401).send({ error: true, message: 'Une ou plusieurs article n\'existe pas ' });

        }
    }
    // static updatePassif = async (req: Request, res: Response) => {
    //     try {
    //         // Récupération de toutes les données du body
    //         const { id, articles} = req.body;

    //         // Vérification de si toutes les données nécessaire sont présentes
    //         if (!id) throw { code:400 } ;
    //         // Vérification du passif  existe
    //         const passif: any = await Passif.findOne({_id: id});
    //         if (!passif) throw { code : 401 };

    //         // Envoi de la réponse
    //         res.status(200).send({ error: false, message: 'actif successfully updated',actif : passif});
    //     } catch (err) {
    //         if (err.code === 400) res.status(401).send({ error: true, message: 'Champs id manquant' });
    //         if (err.code === 401) res.status(401).send({ error: true, message: 'Le passif que vous avez indiquez est inexistant ' });

        
    //     }
    // }
    static updateCharge = async (req: Request, res: Response) => {
        try {
            // Récupération de toutes les données du body
            const { id, expenses } = req.body;

            // Vérification de si toutes les données nécessaire sont présentes
            if (!id) throw new Error('Missing id field');

            // Vérification de si la facture existe
            const charge: any = await Charge.findOne({_id: id});
            if (!charge) throw new Error('Invalid bill id');
            const expensesP : any = await insertChargeOfExpense(charge, expenses);
            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'actif successfully updated',actif : charge});
        } catch (err) {
        
        }
    }
    // static updateProduit = async (req: Request, res: Response) => {
    //     try {
    //         // Récupération de toutes les données du body
    //         const { id, articles} = req.body;
    //         // console.log(articles);
    //         // Vérification de si toutes les données nécessaire sont présentes
    //         if (!id) throw new Error('Missing id field');

    //         // Vérification de si la facture existe
    //         const actif: any = await Actif.findOne({_id: id});
    //         if (!actif) throw new Error('Invalid bill id');

    //         const articleFind: any = await Article.findOne({ _id: articles});
    //         console.log(articleFind);
    //         if (!articleFind) throw new Error('Invalid article id');
    //         // Création des données existante à modifier
    //         const UpdateData: any = {};

    //         if (articleFind) UpdateData.immobilisation = actif.immobilisation = articleFind;
           

    //         // Modification de la facture
    //         await updateActif(id, UpdateData);

    //         // Envoi de la réponse
    //         res.status(200).send({ error: false, message: 'actif successfully updated',actif : actif});
    //     } catch (err) {
        
    //     }
    // }


}