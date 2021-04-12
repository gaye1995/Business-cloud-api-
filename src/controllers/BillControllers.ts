import { Request, Response } from 'express';
import { Bill } from '../models/BillModel';
import { updateBill } from '../helpers/checkFunction/editBill';

export class BillController {

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
}