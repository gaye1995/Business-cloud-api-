import mongoose from 'mongoose';
export interface BilanInterface {
    _id: string;
    actif?: ActifInterface[];
    passif?:  PassifInterface[];
    dateBilan: Date;
}
export interface ActifInterface {
    _id: string;
    immobilisation?: ActifArticleInterface[];
    totalI?: Number;
    creance?:  ActifBillInterface[];
    totalII?: Number;
    disponibilite?: ActifBanqueInterface[];
    totalIII?: Number;
    totalActif?: number;
    actifDateDebut?: Date;
    actifDateFin?: Date;

}
export interface ActifInterfaceJson {
    immobilisation?: ActifArticleInterface[];
    totalI?: Number;
    creance?:  ActifBillInterface[];
    totalII?: Number;
    disponibilite?: ActifBanqueInterface[];
    totalIII?: Number;
    totalActif?: number;
}
export interface EditActif {
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
}
export interface ActifBillInterface {
    billId: string;
}
export interface ActifBanqueInterface {
    banqueId: string;
}
export interface PassifInterface {
    _id: string;
    capitauxPropres?: Array<Object>,
    dettes?: Array<Object>,
    totalPassif?: number;
}
export interface PassifExpenseInterface {
    userExpenseNum: string;
}
export interface ChargeInterface {
    _id: string;
    exploitation?:  PassifExpenseInterface[];
    totalTTC?: number;
}
export interface ProduitInterface {
    _id: string;
    articleId: mongoose.Schema.Types.ObjectId,
    totalPassif: number;
    passifDateDebut: Date;
    passifDateFin: Date;
}