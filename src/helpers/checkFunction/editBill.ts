
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { BillInterface, EditBill } from '../../interfaces/BillInterface';
import { Bill } from '../../models/BillModel';
import { ActifInterface, ChargeInterface, EditActif } from '../../interfaces/BilanInterface';
import { Actif } from '../../models/ActifModel';
import { Passif } from '../../models/PassifModel';
import { Charge } from '../../models/ChargeModel';

config();

export const updateBill = async (bill: BillInterface, updateAllData: EditActif): Promise<void> => {
     await Bill.updateOne({ _id: mongoose.Types.ObjectId(bill.id), billNum: bill.billNum }, { $set: updateAllData });
};

export const updateActif = async (actif: ActifInterface, updateAllData: ActifInterface): Promise<void> => {
     await Actif.updateOne({ _id: mongoose.Types.ObjectId(actif._id)}, { $set  : updateAllData});
};  
export const updatePassif = async (passif: ActifInterface, updateAllData: any): Promise<void> => {
     await Passif.updateOne({ _id: mongoose.Types.ObjectId(passif._id)}, { $set  : updateAllData});
};  

export const updateCharge = async (charge: ChargeInterface, updateAllData: ChargeInterface): Promise<void> => {
     await Charge.updateOne({ _id: mongoose.Types.ObjectId(charge._id)}, { $set  : updateAllData});
};  
export const updateProduit = async (produit: ActifInterface, updateAllData: ActifInterface): Promise<void> => {
     await Actif.updateOne({ _id: mongoose.Types.ObjectId(produit._id)}, { $set  : updateAllData});
};
  

