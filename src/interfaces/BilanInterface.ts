import mongoose from 'mongoose';

export interface ActifInterface {
    _id: string;
    immobilisation?: ActifArticleInterface[];
    creance?:  ActifBillInterface[];
    disponibilite?: ActifBanqueInterface[];
    totalActif?: number;
    actifDateDebut?: Date;
    actifDateFin?: Date;

}
export interface ActifArticleInterface {
    articleId: string;
    quantity: number;
    montantTTC : number;
}
export interface ActifBillInterface {
    billId: string;
}
export interface ActifBanqueInterface {
    banqueId: string;
}
export interface PassifInterface {
    _id: string;
    articleId: mongoose.Schema.Types.ObjectId,
    expense:  PassifExpenseInterface[];
    totalPassif: number;
    passifDateDebut: Date;
    passifDateFin: Date;
}
export interface PassifExpenseInterface {
    userExpenseNum:  mongoose.Schema.Types.ObjectId;
    total: number;
}
