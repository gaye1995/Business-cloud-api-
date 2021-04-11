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

    static getBill = async (req: Request, res: Response) => {
        try {
            const allBill: any = await Bill.find({});
            if(!allBill) throw {code : 400}
            res.status(200).send({ error: true, Client: allBill });
        } catch (err) {
            if (err.code === 400) res.status(401).send({ error: true, message: 'Il n\'y a pas de facture' });
        }
    }
    static getOneBill = async (req: Request, res: Response) => {
        try {
        const { id } = req.params;
        const bill: any = await Bill.findOne({_id : id});
        if (!bill) throw { code : 400}
        res.status(201).send({error: false, Message: "facture numéro : "+ bill.billNum, bill});
        } catch (err) {
        if (err.code === 400)  res.status(401).send({error : true , message : 'la facture n\'existe pas' });            
        }
    }
    static deleteBill = async(req: Request,res: Response) => {
        try {
            const { id } = req.params;
            const bill: any = await Bill.findOne({_id : id});
            console.log(id);
            if(!bill) throw { code : 400 };
            await Bill.deleteOne(bill);
            res.status(201).send({error: false, Message: "facture supprimer avec sucess"});
        } catch (err) {
            if (err.code === 400)  res.status(401).send({error : true , message : 'la facture n\'existe pas' });            
        }
    }
    static updateBill = async(req: Request,res: Response) => {
        try {
            const { id } = req.params;
            console.log(id);
            const data: any  = req.body;
            console.log(data);
            const bill: any = await Bill.findOne({_id : id});
            console.log(bill);
            if(!bill) throw { code : 400 };
            await updateBill(bill, data);
            console.log(bill.status);
            res.status(201).send({error: false, Message: "facture update avec sucess"});
        } catch (err) {
            if (err.code === 400)  res.status(401).send({error : true , message : 'la facture n\'existe pas' });            
        }
    }

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

