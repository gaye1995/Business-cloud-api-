import { BanqueInterface, BanqueInterfaceJson } from "../interfaces/BanqueInterface";
import { UsersInterface, UsersInterfaceJson, ClientInterfaceJson, ClientInterface} from "../interfaces/UsersInterface";

export const UserJSON = (user: UsersInterface ): UsersInterfaceJson => {
    const MoreOfUser: UsersInterfaceJson = {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token: user.token ,
    };
    if (user.birthdayDate) MoreOfUser.birthdayDate = user.birthdayDate;
    if (user.phone) MoreOfUser.phone = user.phone;
    if (user.avatar) MoreOfUser.avatar = user.avatar;
    if (user.address) MoreOfUser.address = user.address;
    if (user.zip) MoreOfUser.zip = user.zip;
    if (user.city) MoreOfUser.city = user.city;
    if (user.country) MoreOfUser.country = user.country;
    if (user.currency) MoreOfUser.currency = user.currency;
    return MoreOfUser;
};
export const ClientJSON = (user: ClientInterface ): ClientInterfaceJson => {
    const MoreOfUser: ClientInterfaceJson = {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token: user.token ,
    };
    if (user.birthdayDate) MoreOfUser.birthdayDate = user.birthdayDate;
    if (user.phone) MoreOfUser.phone = user.phone;
    if (user.avatar) MoreOfUser.avatar = user.avatar;
    if (user.address) MoreOfUser.address = user.address;
    if (user.zip) MoreOfUser.zip = user.zip;
    if (user.city) MoreOfUser.city = user.city;
    if (user.country) MoreOfUser.country = user.country;
    if (user.currency) MoreOfUser.currency = user.currency;
    return MoreOfUser;
};
export const BanqueJSON = (banque: BanqueInterface ): BanqueInterfaceJson => {
    const MoreOBanque: BanqueInterfaceJson = {
    name: banque.name,
    libelle: banque.libelle,
    iban: banque.iban,   
    bic: banque.bic,
    address: banque.address,
    city: banque.city,
    zip : banque.zip,
    country: banque.country,
    createdAt: banque.createdAt,
    updatedAt: banque.updatedAt,
   
    };
    if (banque.phone) MoreOBanque.phone = banque.phone;
    if (banque.fax) banque.fax = banque.fax;
    if (banque.country) MoreOBanque.country = banque.country;
    if (banque.currency) MoreOBanque.currency = banque.currency;
    
    return MoreOBanque;
};
