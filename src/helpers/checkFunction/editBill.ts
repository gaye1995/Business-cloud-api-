
import mongoose from 'mongoose';
import { UserModel } from '../../models/UsersModel';
import { config } from 'dotenv';
import { BillInterface, EditBill } from '../../interfaces/BillInterface';

config();

export const updateBill = async (bill: BillInterface, updateAllData: EditBill): Promise<void> => {
     await Bill.updateOne({ _id: mongoose.Types.ObjectId(bill.id), billNum: bill.billNum }, { $set: updateAllData });
};