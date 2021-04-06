import { Request, Response } from 'express';
import { Bill } from '../models/BillModel';
import { Client } from '../models/ClientModel';
import { UserExpense } from '../models/DepenseModel';
import { ClientJSON, clientListe } from '../utils/returnData';

export class ClientController {

    static getCostomers = async (req: Request, res: Response) => {
        try {
            const allCustomers: any = await Client.find({});
            const a: any = clientListe(allCustomers);
            res.status(200).send({ error: true, Client: a });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
        }
    }
    static getArticle = async (req: Request, res: Response) => {
        try {
            const allArticle: any = await Bill.find({});
            res.status(200).send({ error: true, Articles: allArticle });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
        }
    }
    static getBill = async (req: Request, res: Response) => {
        try {
            const allBill: any = await Bill.find({});
            res.status(200).send({ error: true, Client: allBill });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
        }
    }
    static UserExpense = async (req: Request, res: Response) => {
        try {
            const allUserExpense: any = await UserExpense.find({});
            res.status(200).send({ error: true, Depense: allUserExpense });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
        }
    }
}

