
import mongoose from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
import { EditUser } from '../../interfaces/UsersInterface';
import { UserModel } from '../../models/UsersModel';
import { config } from 'dotenv';
import { UsersInterface } from '../../interfaces/UsersInterface';
import { ComptableModel } from '../../models/ComptableModel';

config();

export const updateUser = async (user: UsersInterface, updateAllData: EditUser): Promise<void> => {
     if(updateAllData.password == "") {
          await ComptableModel.updateOne({ _id: mongoose.Types.ObjectId(user._id), email: user.email, password: user.password }, { $set: updateAllData });
     }
     await ComptableModel.updateOne({ _id: mongoose.Types.ObjectId(user._id), email: user.email }, { $set: updateAllData });
};
export const updateLastLogin = async (user: any, reset?: boolean): Promise<any> => {
     if (reset) user.attempt = 0;
     await updateUser(user, { lastLogin: Date.now(), attempt: user.attempt + 1 });
     return user;
 };