
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { BillInterface, EditBill } from '../../interfaces/BillInterface';
import { Bill } from '../../models/BillModel';
import { ActifInterface, EditActif } from '../../interfaces/BilanInterface';
import { Actif } from '../../models/ActifModel';

config();

export const updateBill = async (bill: BillInterface, updateAllData: EditActif): Promise<void> => {
     await Bill.updateOne({ _id: mongoose.Types.ObjectId(bill.id), billNum: bill.billNum }, { $set: updateAllData });
};

export const updateActif = async (actif: ActifInterface, updateAllData: ActifInterface): Promise<void> => {
     await Actif.updateOne({ _id: mongoose.Types.ObjectId(actif._id)}, { $push: { immobilisation : updateAllData} });
};  
