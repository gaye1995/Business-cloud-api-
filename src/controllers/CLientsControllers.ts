import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Bill } from '../models/BillModel';
import { Client } from '../models/ClientModel';
import { Expense } from '../models/DepenseModel';
import { ClientJSON } from '../utils/returnData';
import Datahelpers from '../helpers/Datahelpers';
import { UserModel } from '../models/UsersModel';

export class ClientController {

    // Requete et fonction consernant les clients

    static getCostomers = async (req: Request, res: Response) => {
        try {
            const allCustomers: any = await Client.find({});
            if(!allCustomers) throw {code : 400};
            const client: any = ClientJSON(allCustomers);
            res.status(200).send({ error: false, Client: allCustomers });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'il n\'y a pas de client' });
            else Datahelpers.errorHandler(res, err);
        }
    }
    //   recupération d'un client
    static getOneCostomers = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if(!id) throw { code : 400}
            const allCustomers: any = await Client.findOne({_id: id});
            if(!allCustomers) throw { code : 401}
            const client: any = ClientJSON(allCustomers);
            res.status(200).send({ error: false, Client: client});
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'le parametre id est manquant' });
            if (err.code === 401) res.status(400).send({ error: true, message: 'Le client n\'existe pas' });
            else Datahelpers.errorHandler(res, err);
        }
    }
    static deleteCustomers = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            if(!id) throw {code : 400}
            const client: any = await Client.findOne({ _id: mongoose.Types.ObjectId(id)});
            if(!client){
                res.status(403).send({ error: true, message: 'Le client ' + client.email + ' n\'existe pas'});
            }else{
                await Client.deleteOne({ _id: mongoose.Types.ObjectId(id)})
                res.status(200).send({ error: false, message: 'Le client ' + client.email + ' à été supprimer avec succes'});
            }
        }catch(err){
            if (err.code === 400) res.status(400).send({ error: true, message: 'le parametre id est manquant' });            
        }
    }
    // Requete et fonction consernant les articles des factures

    static getArticle = async (req: Request, res: Response) => {
        try {
            const allArticle: any = await Bill.find({});
            if(!allArticle) throw { code : 400}
            res.status(200).send({ error: false, Articles: allArticle });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'Il n\y a pas d\'article' });
            else Datahelpers.errorHandler(res, err);

        }
    }

    // Requete et fonction consernant les dépenses des Clients
    static getOneExpenses = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if(!id) throw { code : 400}
            const expense: any = await Expense.findOne({ _id: mongoose.Types.ObjectId(id)});
            if(!expense) throw { code : 401}
            res.status(200).send({ error: false, Expense: expense });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'le parametre id est manquant' });
            if (err.code === 401) res.status(400).send({ error: true, message: 'cette dépense n\'existe pas' });
            else Datahelpers.errorHandler(res, err);

        }
    }

    // Requete et fonction consernant les Dépenses 
// route marche  pas
    static getExpense = async (req: Request, res: Response) => {
        console.log("expenses")

        try {
            console.log("expenses")
            const expenses: any = await Expense.find({});
            console.log(expenses)
            if (!expenses) throw { code : 400}
            res.status(200).send({ error: false, Depense: expenses });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'il n\'y a pas de dépense ' });
            else Datahelpers.errorHandler(res, err);

        }
    }
    static deleteExpense = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            if(!id) throw {code : 400}
            const expense: any = await Expense.findOne({ _id: mongoose.Types.ObjectId(id)});
            const userExpenses : any = expense.userId;
            const user: any = await UserModel.findOne({ _id: mongoose.Types.ObjectId(userExpenses)});
            const deleteExpense: any = await Expense.deleteOne({ _id: mongoose.Types.ObjectId(id)});
            if(!deleteExpense){
                res.status(403).send({ error: true, message: 'La dépense du montant '+ expense.price + 'du client de '+ user.name + ' n\'a pas été supprimer'});
            }else{
                res.status(200).send({ error: false, message: 'La dépense du montant de '+ expense.price + ' du client '+ user.name + ' a été supprimer'});
            }
        }catch(err){
            if (err.code === 400) res.status(400).send({ error: true, message: 'le parametre id est manquant' });            
        }
    }
}

