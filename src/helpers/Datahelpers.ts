import validator from 'validator';
import IBAN from 'iban';
import BIC from 'bic';
import ibanConstructor from 'iban-constructor';
import { Request, Response } from 'express';

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
    /**
 * Fontion d'envoi des erreurs non géré par l'api
 * @param res Réponse express
 * @param err Message d'erreur
 */
    static errorHandler = (res: Response, err: any) => {
    console.log(err);
    res.status(500).send({ error: true, message: 'Unexpected error', err });
};
}
