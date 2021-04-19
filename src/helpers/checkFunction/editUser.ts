
import mongoose from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
import { EditUser } from '../../interfaces/UsersInterface';
import { UserModel } from '../../models/UsersModel';
import { config } from 'dotenv';
import { UsersInterface } from '../../interfaces/UsersInterface';

config();

export const updateUser = async (user: UsersInterface, updateAllData: EditUser): Promise<void> => {
     await UserModel.updateOne({ _id: mongoose.Types.ObjectId(user._id), email: user.email }, { $set: updateAllData });
};