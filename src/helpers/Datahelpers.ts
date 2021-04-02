import validator from 'validator';


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
        return validator.isBic(bic);
    }
    static checkIban(iban: string): boolean {
        return validator.isIban(iban);
    }
}