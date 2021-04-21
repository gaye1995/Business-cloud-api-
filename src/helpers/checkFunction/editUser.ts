
import mongoose from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
import { EditUser } from '../../interfaces/UsersInterface';
import { UserModel } from '../../models/UsersModel';
import { config } from 'dotenv';
import { UsersInterface } from '../../interfaces/UsersInterface';

config();

export const updateUser = async (user: UsersInterface, updateAllData: EditUser): Promise<void> => {
     if(updateAllData.password == "") {
          await UserModel.updateOne({ _id: mongoose.Types.ObjectId(user._id), email: user.email, password: user.password }, { $set: updateAllData });
     }
     await UserModel.updateOne({ _id: mongoose.Types.ObjectId(user._id), email: user.email }, { $set: updateAllData });
};