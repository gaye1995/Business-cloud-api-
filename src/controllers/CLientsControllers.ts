import { Request, Response } from 'express';
import { Bill } from '../models/BillModel';
import { Client } from '../models/ClientModel';
import { UserExpense } from '../models/DepenseModel';
import { updateBill } from '../helpers/checkFunction/editBill';
import { ClientJSON, clientListe } from '../utils/returnData';

export class ClientController {

    // Requete et fonction consernant les clients

    static getCostomers = async (req: Request, res: Response) => {
        try {
            const allCustomers: any = await Client.find({});
            const a: any = clientListe(allCustomers);
            res.status(200).send({ error: true, Client: a });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
        }
    }
    
    static getOneCostomers = async (req: Request, res: Response) => {
        try {
            const allCustomers: any = await Client.find({});
            const a: any = clientListe(allCustomers);
            res.status(200).send({ error: true, Client: a });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
        }
    }
    // Requete et fonction consernant les articles des factures

    static getArticle = async (req: Request, res: Response) => {
        try {
            const allArticle: any = await Bill.find({});
            res.status(200).send({ error: true, Articles: allArticle });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
        }
    }

    // Requete et fonction consernant les Factures des Clients

 

    // Requete et fonction consernant les Dépenses 

    static UserExpense = async (req: Request, res: Response) => {
        try {
            const allUserExpense: any = await UserExpense.find({});
            if (!allUserExpense) throw { code : 400}
            res.status(200).send({ error: true, Depense: allUserExpense });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'il n\'y a pas de dépense ' });
        }
    }
}

