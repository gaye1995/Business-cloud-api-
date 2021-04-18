import { ArticleInterface, ArticleInterfaceJson } from "../interfaces/ArticleInterface";
import { BanqueInterface, BanqueInterfaceJson } from "../interfaces/BanqueInterface";
import { ActifInterface, ActifInterfaceJson } from "../interfaces/BilanInterface";
import { UsersInterface, UsersInterfaceJson, ClientInterfaceJson, ClientInterface} from "../interfaces/UsersInterface";

export const UserJSON = (user: UsersInterface ): UsersInterfaceJson => {
    const MoreOfUser: UsersInterfaceJson = {
        name: user.name,
        email: user.email,
        role : user.role,
    };
    if (user.birthdayDate) MoreOfUser.birthdayDate = user.birthdayDate;
    if (user.phone) MoreOfUser.phone = user.phone;
    if (user.avatar) MoreOfUser.avatar = user.avatar;
    if (user.address) MoreOfUser.address = user.address;
    if (user.zip) MoreOfUser.zip = user.zip;
    if (user.city) MoreOfUser.city = user.city;
    if (user.country) MoreOfUser.country = user.country;
    return MoreOfUser;
};
export const ClientJSON = (user: ClientInterface ): ClientInterfaceJson => {
    const MoreOfUser: ClientInterfaceJson = {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
    if (user.birthdayDate) MoreOfUser.birthdayDate = user.birthdayDate;
    if (user.phone) MoreOfUser.phone = user.phone;
    if (user.avatar) MoreOfUser.avatar = user.avatar;
    if (user.address) MoreOfUser.address = user.address;
    if (user.zip) MoreOfUser.zip = user.zip;
    if (user.city) MoreOfUser.city = user.city;
    if (user.country) MoreOfUser.country = user.country;
 
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
export const clientListe = (array : Array<ClientInterface>) =>{
    array.map((maListe: any ) =>{
        Object.assign(maListe,{_id:maListe._id});
            delete maListe.email
            delete maListe.token
            delete maListe.refresh_token
            delete maListe.isActive
            delete maListe._id
            delete maListe.password

      })
      if (array) return array;
      else return [];
}
export const ArticleJSON = (article: ArticleInterface ): ArticleInterfaceJson => {
    const MoreOfUser: ArticleInterfaceJson = {
        name: article.name,
    };
 
    return MoreOfUser;
};
export const ActifJSON = (actif: ActifInterface ): ActifInterfaceJson => {
    const MoreOBanque: ActifInterfaceJson = {
    immobilisation : actif.immobilisation,
    totalI : actif.totalI,
    creance: actif.creance,
    totalII : actif.totalII,
    disponibilite : actif.disponibilite,
    totalIII : actif.totalIII,
    totalActif : actif.totalActif,
   
    };
    return MoreOBanque;
};