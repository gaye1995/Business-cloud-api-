import mongoose from 'mongoose';

export interface ActifInterface {
    articleId: mongoose.Schema.Types.ObjectId,
    billId:  mongoose.Schema.Types.ObjectId;
    totalTTC: number;
    actifDateDebut: Date;
    actifDateFin: Date;

}

export interface PassifInterface {
    articleId: mongoose.Schema.Types.ObjectId,
    userExpenseNum:  mongoose.Schema.Types.ObjectId;
    totalTTC: number;
    passifDateDebut: Date;
    passifDateFin: Date;
}