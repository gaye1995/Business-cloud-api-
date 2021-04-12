import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { config } from 'dotenv';
import { ActifInterface } from "../interfaces/BilanInterface";
import { Actif } from "../models/ActifModel";
import { ArticleInterface } from '../interfaces/ArticleInterface';
import { BillInterface } from '../interfaces/BillInterface';
config();

export const insertOfActif = async (actif: ActifInterface, updateAllData: ActifInterface): Promise<void>  =>  {
    await Actif.updateOne({ _id: mongoose.Types.ObjectId(actif._id)}, { $set: updateAllData });
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