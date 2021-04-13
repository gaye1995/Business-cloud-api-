import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { config } from 'dotenv';
import { ActifArticleInterface, ActifBillInterface, ActifInterface, PassifExpenseInterface } from "../interfaces/BilanInterface";
import { Actif } from "../models/ActifModel";
import { ArticleInterface } from '../interfaces/ArticleInterface';
import { BillInterface } from '../interfaces/BillInterface';
import { Bill } from '../models/BillModel';
import { updateActif, updateCharge, updatePassif } from '../helpers/checkFunction/editBill';
import { Article } from '../models/ArticleModel';
import { Charge } from '../models/ChargeModel';
import { UserExpense } from '../models/DepenseModel';
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
export const insertChargeOfExpense = async (charge: any, exploitation: any )=>  {
    if (exploitation) {
        exploitation.map(async (expense: PassifExpenseInterface) => {
            if (!expense.userExpenseNum) throw new Error('Invalid article format');
            const expenceFind: any = await UserExpense.findOne({ _id: mongoose.Types.ObjectId(expense.userExpenseNum) });
            if (!expenceFind) throw { code: 402 };
        });
    }
    const UpdateDataExplotatation: any = {};
    if (exploitation) UpdateDataExplotatation.exploitation = charge.exploitation = exploitation;
    // insertion des depense dans le charge du compte de resultat
    await updateCharge(charge, UpdateDataExplotatation);
    // recupération de la totalité des données des expenses
    const populateChargeExpense: any = await Charge.findOne({ _id: charge._id }).populate('explotatation.userExpenseNum');
    // Envoi de la réponse
    return populateChargeExpense;
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