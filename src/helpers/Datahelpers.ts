import validator from 'validator';
import IBAN from 'iban';
import BIC from 'bic';
import ibanConstructor from 'iban-constructor';
import { Request, Response } from 'express';
import { Bill } from '../models/BillModel';

export default class Datahelpers {

  
    static checkEmail(email: string): boolean {
        return validator.isEmail(email);
    }
    static checkPassword(password: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
        if (password.trim().length < 8 || password.trim().length > 20) return false;
        else return regex.test(password);
    }
    static checkTel(phone: string): boolean {
        return validator.isMobilePhone(phone);
    }
    static checkDate(birthdayDate: string): boolean {
        return validator.isDate(birthdayDate, { format: 'DD-MM-YYYY', strictMode: true, delimiters: ['-', '/', '.'] });
    }
    static checkBic(bic: string): boolean {
        return BIC.isValid(bic);
    }
    static checkIban(iban: string): boolean {
        return IBAN.isValid(iban);
    }
    static billStatus(status: string): boolean {
        return (status === 'Non payée' || status === 'Partiellement payée' || status === 'Payée' || status === 'En retard') ? true : false;
    }    
    /**
 * Fontion d'envoi des erreurs non géré par l'api
 * @param res Réponse express
 * @param err Message d'erreur
 */
    static errorHandler = (res: Response, err: any) => {
    console.log(err);
    res.status(500).send({ error: true, message: 'Unexpected error', err });
};
static async CheckBillNumber(billNumber: string): Promise<boolean> {
    if (billNumber.substring(0, 3) !== 'FAC') return false;
    if (billNumber.length !== 9) return false;
    const bills = await Bill.find({ billNum: billNumber });
    if (bills.length !== 0) return false;
    return true;
}
static CheckDeadline(deadline: string): boolean {
    return ((new Date(deadline).getTime() - Date.now()) > 0) ? true : false;
}
static validPrice(price: string | number): number {
    if (typeof price === 'number') return validator.toFloat((price as number).toFixed(2));
    else return validator.toFloat(price);
}

}
