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
import { Expense } from '../models/DepenseModel';
config();

export const insertActifOfCreance = async (actif:any,creance: any )=>  {
    if (!creance) throw {code : 401};
    creance.map(async (bill: ActifBillInterface) => {
        if (!bill.billId) throw new Error('Invalid bill');
        const billFind: any = await Bill.findOne({ _id: mongoose.Types.ObjectId(bill.billId) });
        if (!billFind) throw { code: 402 };
    });
    const UpdateDataCreance: any = {};
    UpdateDataCreance.creance = actif.creance = creance;
    // insertion des creance dans l'actif
    await updateActif(actif, UpdateDataCreance);
    let total: number = 0;
    for (let i = 0; i < creance.length; i++) {
        const billFind: any = await Bill.findOne({ _id: mongoose.Types.ObjectId(creance[i].billId) });
        total = total + billFind.totalHT;
    }
    await Actif.updateOne({ _id: mongoose.Types.ObjectId(actif._id)}, { $set  : {totalII : total}});
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
    let totalHT = 0;
    let totalTTC = 0;
    let total: number = 0;
    for (let i = 0; i < immobilisation.length; i++) {
        const articleFind: any = await Article.findOne({ _id: mongoose.Types.ObjectId(immobilisation[i].articleId) });
        totalHT += (articleFind.price * immobilisation[i].quantity);
        totalTTC += ((articleFind.price * (1 + (articleFind.tva / 100))) * immobilisation[i].quantity);
        total = total + totalTTC
    }
    await Actif.updateOne({ _id: mongoose.Types.ObjectId(actif._id)}, { $set  : {totalI : total}});
    // recupération de la totalité des données de l'article
    const populateActifImmo: any = await Actif.findOne({ _id: actif._id }).populate('immobilisation.articleId');
    // Envoi de la réponse
    return populateActifImmo;

}

export const insertPassif = async (actifBilan: any, passif: any, dettes: any )=>  {
    const capitalP : any = [{"capital": 120000}, {"resultat": 0}];
    const actif: any = await Actif.findOne({_id: mongoose.Types.ObjectId(actifBilan)})
    const UpdateDataPassif: any = {};
    if (!dettes) throw {code : 404}
    let totalI : number = 0;
    let totalII : number = 0;
    totalI = passif.capitauxPropres[0]["capital"] + passif.capitauxPropres[1]["resultat"] ;
    totalII = passif.dettes[0]["emprunts"] + passif.dettes[1]["detteFournisseurs"] + passif.dettes[2]["autresDette"];
    let resultat : number = actif.totalActif - (totalI + totalII);
    console.log(actif.totalActif);
    console.log(totalI + totalII);
    console.log(resultat);
    UpdateDataPassif.totalII = passif.totalII = totalII;
    UpdateDataPassif.dettes = passif.dettes = dettes;
    UpdateDataPassif.capitauxPropres = passif.capitauxPropres = capitalP ;
    UpdateDataPassif.dettes[1]["resultat"] = passif.dettes[1]["resultat"] = resultat ;
    UpdateDataPassif.totalPassif = totalI + totalII + resultat ;
    // insertion des immos dans l'actif
    const dataPassif : any = await updatePassif(passif, UpdateDataPassif);
    return dataPassif;

}
export const insertChargeOfExpense = async (charge: any, exploitation: any , financier: any,exceptionnelle: any)=>  {
    if (exploitation || financier || exceptionnelle) {
        exploitation.map(async (expense: PassifExpenseInterface) => {
            if (!expense.userExpenseNum) throw new Error('Invalid article format');
            const expenceFind: any = await Expense.findOne({ _id: mongoose.Types.ObjectId(expense.userExpenseNum) });
            if (!expenceFind) throw { code: 402 };
        });
    }
    const UpdateDataExplotatation: any = {};
    if (exploitation) UpdateDataExplotatation.exploitation = charge.exploitation = exploitation;
    if (financier) UpdateDataExplotatation.financier = charge.financier = financier;
    if (exceptionnelle) UpdateDataExplotatation.exceptionnelle = charge.exceptionnelle = exceptionnelle;
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