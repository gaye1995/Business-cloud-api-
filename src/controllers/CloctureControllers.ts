import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Datahelpers from '../helpers/Datahelpers';
import { Bilan } from '../models/BilanModel';
import { Actif } from '../models/ActifModel';
import { Charge } from '../models/ChargeModel';
import { Passif } from '../models/PassifModel';
import { insertActifOfCreance, insertActifOfImmo, insertChargeOfExpense, insertPassif } from '../utils/insertData';
import { ActifJSON } from '../utils/returnData';

export class CloctureController {
    // Création de l'actif du bilan
    static createBilanActif = async (req: Request, res: Response) => {
        try {
            // recupération de la date
            const { actifDate } = req.body;
            //verification du format de la date
            if (!actifDate && !Datahelpers.checkDate(actifDate)) throw {code: 405};
            let Actifs: any = await Actif.findOne({date : actifDate});
            // email doesn't existe 
            if (!Actifs) throw { code: 402 }
            req.body.immobilisation = [];
            req.body.totalI = 0;
            req.body.creance = [];
            req.body.totalII = 0;
            req.body.disponibilite = [];
            req.body.totalIII = 0;
            req.body.totalActif = 0;
            // insertion des données
            const actif : any = await Actif.create(req.body);
            // réponse attendu
            res.status(200).send({ error: false, message: 'Actif Bilan created', actif: {_id: actif._id, immobilisation: actif.immobilisation, date: actif.actifDate ,disponibilite : actif.disponibilite } });
        } catch (err) {
            if (err.code === 405) console.log('incorect format date' );
            if (err.code === 402) console.log('Actif déjas existant' );
            else Datahelpers.errorHandler(res, err);

        }
    }

    // Création du passif du bilan
    static createBilanPassif = async (req: Request, res: Response) => {
        try {
            // initialisation des données
            req.body.capitauxPropres = [];
            req.body.dettes = [];
            req.body.totalII = 0;
            req.body.totalPassif = 0;
            // création des données
            const passif : any = await Passif.create(req.body);
            // réponse attendu    
            res.status(200).send({ error: false, message: 'Passif Bilan created', passif: passif });
        } catch (err) {
            if (err.code === 405) res.status(402).send({error: true, message: 'incorect format date' });
            else Datahelpers.errorHandler(res, err);
        }
    } 
    // création de charge de compte de resultat
    static createCharge = async (req: Request, res: Response) => {
        try {
        
            // initialisation des données
            req.body.exploitation = [];
            req.body.totalI = 0;
            req.body.financier = [];
            req.body.totalII = 0;
            req.body.exceptionnelle = [];
            req.body.totalIII = 0;
            req.body.totalCharge = 0;
            // création des données
            const charge : any = await Charge.create(req.body);    
            // réponse attendu    
            res.status(200).send({ error: false, message: 'Charge du compte de resultat  created', charge: { expense: charge.expense } });
        } catch (err) {
            if (err.code === 405) console.log('incorect format date' );
            else Datahelpers.errorHandler(res, err);
        }
    }
    // création du produit de compte de resultat
    static createProduit = async (req: Request, res: Response) => {
        try {
            // recupération de la date
            const { produitDate } = req.body;
            //verification du format de la date
            if (!produitDate && !Datahelpers.checkDate(produitDate)) throw { code: 405 };
            // initialisation des données
            req.body.project = [];
            req.body.totalProduit = 0;
            // création des données
            // const produit: any = await Produit.create(req.body);
            // // réponse attendu    
            // res.status(200).send({ error: false, message: 'Produit des compte de resultat  created', produit: { expense: produit.project } });
            } catch (err) {
            if (err.code === 405) console.log('incorect format date');
            else Datahelpers.errorHandler(res, err);
            }
    }
    static updateActif = async (req: Request, res: Response) => {
        try {
            // Récupération de toutes les données du body
            const { id, immobilisation , creance } = req.body;
            if (!id) throw { code:400 } ;
            // recherche de l'actif
            const actif: any = await Actif.findOne({ _id: id });
            if (!actif) throw { code : 401 };
            // await insertActifOfCreance(actif, creance);
            // await insertActifOfImmo(actif, immobilisation);
            const totalA : any = actif.totalI + actif.totalII + actif.totalIII ;
            await Actif.findOne({ _id: mongoose.Types.ObjectId(id)}).populate('creance.billId');
            await Actif.findOne({ _id: mongoose.Types.ObjectId(id)}).populate('immobilisation.articleId');
            await Actif.updateOne({ _id: mongoose.Types.ObjectId(id)}, { $set  : {totalActif : totalA}});
            // réponse  
            res.status(200).send({ error: false, message: 'actif successfully updated', actif: ActifJSON(actif)});
        } catch (err) {
            if (err.code === 400) res.status(401).send({ error: true, message: 'Champs id manquant' });
            else if (err.code === 401) res.status(401).send({ error: true, message: 'L\'actif que vous avez indiquez est inexistant ' });
            else if (err.code === 402) res.status(401).send({ error: true, message: 'Une ou plusieurs article n\'existe pas ' });
            else Datahelpers.errorHandler(res, err);

        }
    }
    static updatePassif = async (req: Request, res: Response) => {
        try {
            // Récupération de toutes les données du body
            const { idActif, idPassif, dette} = req.body;
            // Vérification de si toutes les données nécessaire sont présentes
            if (!idPassif) throw { code:400 } ;
            // Vérification du passif  existe
            const passif: any = await Passif.findOne({_id: idPassif});
            if (!passif) throw { code : 401 };
            // await insertPassif(idActif,passif,dette);
            // await Passif.updateOne({ _id: mongoose.Types.ObjectId(idPassif)}, { $set  : {totalPassif : passif}});
                       // Envoi de la réponse
            res.status(200).send({ error: false, message: 'passif successfully updated',passif : passif});
        } catch (err) {
            if (err.code === 400) res.status(401).send({ error: true, message: 'Champs id manquant' });
            else if (err.code === 401) res.status(401).send({ error: true, message: 'Le passif que vous avez indiquez est inexistant ' });
            else Datahelpers.errorHandler(res, err);
        }
    }
    static updateCharge = async (req: Request, res: Response) => {
        try {
            // Récupération de toutes les données du body
            const { idcharge, exploitation ,financier ,exceptionnelle } = req.body;
            // Vérification de si toutes les données nécessaire sont présentes
            if (!idcharge) throw {code : 400};

            // Vérification de si la facture existe
            const charge: any = await Charge.findOne({_id: idcharge});
            if (!charge) throw {code : 401};
            const expensesP : any = await insertChargeOfExpense(charge, exploitation, financier,exceptionnelle);
            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'charge successfully updated',charge : expensesP});
        } catch (err) {
            if (err.code === 400) res.status(401).send({ error: true, message: 'Champs id manquant' });
            if (err.code === 401) res.status(401).send({ error: true, message: 'Le charge que vous avez indiquez est inexistant ' });
            else Datahelpers.errorHandler(res, err);
        }
    }

    static createBilan = async (req: Request, res: Response) => {
        try {
            // recupération de la date
            const { dateBilan } = req.body;
            //verification du format de la date
            if (!dateBilan && !Datahelpers.checkDate(dateBilan)) throw {code: 405};
            const bilanExist: any = await Bilan.findOne({dateBilan : dateBilan});
            // bilan doesn't existe 
            if (bilanExist) throw { code: 402 }
            req.body.actif = {};
            req.body.passif = {};
            // insertion des données
            const bilan : any = await Bilan.create(req.body);
            // réponse attendu
            res.status(200).send({ error: false, message: ' Bilan created', bilan: bilan });
        } catch (err) {
            if (err.code === 405) res.status(200).send({ error: true, message:'incorect format date' });
            if (err.code === 402)res.status(200).send({ error: true, message:'Bilan déjas existant' });
            else Datahelpers.errorHandler(res, err);

        }
    }
    static getBilan = async (req: Request, res: Response) => {
        try {
            
            const allBilan: any = await Bilan.find({}).populate('actif.immobilisation.articleId').populate('actif.creance.billId');
            // email doesn't existe 
            if (!allBilan) throw { code: 402 }
            
            // réponse attendu
            res.status(200).send({ error: false, message: ' Bilan created', bilan: allBilan });
        } catch (err) {
            if (err.code === 402)res.status(200).send({ error: true, message:' pas de bilan' });
            else Datahelpers.errorHandler(res, err);

        }
    }
    static updateBilan = async (req: Request, res: Response) => {
        try {
            const { immobilisation , creance , dettes, capitauxPropres} = req.body;
            const { id } = req.params;
            const bilan: any = await Bilan.findOne({_id : mongoose.Types.ObjectId(id)}).populate('actif.immobilisation.articleId');
            if (!bilan) throw { code : 401 };
            // await insertActifOfCreance(bilan.actif, creance);
            await insertActifOfImmo(id, bilan.actif, immobilisation);
            await insertActifOfCreance(id, bilan.actif, creance);            
            const totalA : any = bilan.actif.totalI + bilan.actif.totalII ;
            bilan.actif.totalActif = totalA;
            await Bilan.updateOne({ _id: id }, { $set: { actif: bilan.actif} }).populate('actif.immobilisation.articleId').populate('actif.creance.billId');
            await insertPassif(id, bilan.passif, dettes, capitauxPropres);
            console.log(bilan)
            const bil: any = await Bilan.findOne({_id : mongoose.Types.ObjectId(id)}).populate('actif.immobilisation.articleId').populate('actif.creance.billId');
            res.status(200).send({ error: false, message: 'bilan successfully updated', bilan: bil});

        } catch (err) {
            if (err.code === 401)res.status(404).send({ error: true, message:' ce bilan n\'existe pas de bilan' });
        }
    }

}
