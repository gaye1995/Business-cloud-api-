import mongoose from 'mongoose';
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