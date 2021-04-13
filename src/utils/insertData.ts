import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { config } from 'dotenv';
import { ActifArticleInterface, ActifBillInterface, ActifInterface } from "../interfaces/BilanInterface";
import { Actif } from "../models/ActifModel";
import { ArticleInterface } from '../interfaces/ArticleInterface';
import { BillInterface } from '../interfaces/BillInterface';
import { Bill } from '../models/BillModel';
import { updateActif, updatePassif } from '../helpers/checkFunction/editBill';
import { Article } from '../models/ArticleModel';
import { Charge } from '../models/ChargeModel';
config();

export const insertActifOfCreance = async (actif:any,creance: any )=>  {
    if (creance) {
        creance.map(async (bill: ActifBillInterface) => {
            if (!bill.billId) throw new Error('Invalid bill');
            const billFind: any = await Bill.findOne({ _id: mongoose.Types.ObjectId(bill.billId) }, {status: 'Non payé'});
            console.log(billFind);
            if (!billFind) throw {code : 402};
        });
    }
    const UpdateDataCreance: any = {};
    if (creance) UpdateDataCreance.creance = actif.creance = creance;
    // insertion des creance dans l'actif
    await updateActif(actif, UpdateDataCreance);
    const populateActifCreance: any = await Actif.findOne({ _id: actif._id }).populate('creance.billId');
    return populateActifCreance;
}

export const insertActifOfImmo = async (actif:any,immobilisation: any )=>  {
    if (immobilisation) {
        immobilisation.map(async (article: ActifArticleInterface) => {
            if (!article.articleId || !article.quantity) throw new Error('Invalid article format');
            const articleFind: any = await Article.findOne({ _id: mongoose.Types.ObjectId(article.articleId) });
            if (!articleFind) throw { code: 402 };
        });
    }
    const UpdateDataImmo: any = {};
    if (immobilisation) UpdateDataImmo.immobilisation = actif.immobilisation = immobilisation;
    // insertion des immos dans l'actif
    await updateActif(actif, UpdateDataImmo);
    // recupération de la totalité des données de l'article
    const populateActifImmo: any = await Actif.findOne({ _id: actif._id }).populate('immobilisation.articleId');
    // Envoi de la réponse
    return populateActifImmo;

}

export const insertPassifOfExpense = async (passif: any, immobilisation: any )=>  {
    if (immobilisation) {
        immobilisation.map(async (article: ActifArticleInterface) => {
            if (!article.articleId || !article.quantity) throw new Error('Invalid article format');
            const articleFind: any = await Article.findOne({ _id: mongoose.Types.ObjectId(article.articleId) });
            if (!articleFind) throw { code: 402 };
        });
    }
    const UpdateDataImmo: any = {};
    if (immobilisation) UpdateDataImmo.immobilisation = passif.immobilisation = immobilisation;
    // insertion des immos dans l'actif
    await updateActif(passif, UpdateDataImmo);
    // recupération de la totalité des données de l'article
    const populateActifImmo: any = await Actif.findOne({ _id: passif._id }).populate('immobilisation.articleId');
    // Envoi de la réponse
    return populateActifImmo;

}
export const insertChargeOfExpense = async (passif: any, explotatation: any )=>  {
    if (explotatation) {
        explotatation.map(async (article: ActifArticleInterface) => {
            if (!article.articleId || !article.quantity) throw new Error('Invalid article format');
            const articleFind: any = await Article.findOne({ _id: mongoose.Types.ObjectId(article.articleId) });
            if (!articleFind) throw { code: 402 };
        });
    }
    const UpdateDataexplotatation: any = {};
    if (explotatation) UpdateDataexplotatation.explotatation = passif.explotatation = explotatation;
    // insertion des immos dans l'actif
    await updatePassif(passif, UpdateDataexplotatation);
    // recupération de la totalité des données de l'article
    const populateActifImmo: any = await Charge.findOne({ _id: passif._id }).populate('explotatation.articleId');
    // Envoi de la réponse
    return populateActifImmo;

}   
            


export const createActif = async (article: ArticleInterface, bill: BillInterface): Promise<void>  =>  {
}
/**
 * Fontion d'envoi des erreurs non géré par l'api
 * @param res Réponse express
 * @param err Message d'erreur
 */
 const errorHandler = (res: Response, err: any) => {
    console.log(err);
    res.status(500).send({ error: true, message: 'Unexpected error', err });
};