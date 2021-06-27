import { Request, Response } from 'express';
import { Bill } from '../models/BillModel';
import { updateBill, updateBillComptable } from '../helpers/checkFunction/editBill';
import Datahelpers from '../helpers/Datahelpers';
import mongoose from 'mongoose';
import { Enterprise } from '../models/EntrepriseModel';
import { BillComptable } from '../models/BillComptableModel';
import { BillComptableInterface, BillServiceI } from '../interfaces/BillComptableInterface';
import { Service } from '../models/ServiceModel';
import { ComptableModel } from '../models/ComptableModel';

export class BillController {
    static CreateBill = async (req: Request, res: Response) => {
        try {
            const { status, userId, entrepriseId, billNum, deadline, currency } = req.body;
            if (!status || !userId || !entrepriseId || !billNum || !deadline) throw {code: 400};
            if (!Datahelpers.billStatus(status)) throw {code: 401};
            const userComptable: any = await ComptableModel.findOne({ _id: mongoose.Types.ObjectId(userId) });
            if (!userComptable) throw {code: 402};
            const enterprise: any = await Enterprise.findOne({_id: mongoose.Types.ObjectId(entrepriseId)});
            if (!enterprise) throw {code : 403};
            if (!await Datahelpers.CheckBillNumber(billNum)) throw {code: 404};
            if (!Datahelpers.CheckDeadline(deadline)) throw {code: 405};
            req.body.deadline = new Date(deadline);
            req.body.services = [];
            req.body.totalHT = 0;
            req.body.totalTTC = 0;

            // Création de la facture
            const billcomptable: any = await BillComptable.create(req.body);

            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'Bill successfully created', bill: billcomptable });
        } catch (err) {
            if (err.code === 400)  res.status(400).send({ error: true, message: 'Une des données important sont manquants' });
            else if (err.code === 401)  res.status(400).send({ error: true, message: 'Le status de la facture est invalide' });
            else if (err.code === 401)  res.status(400).send({ error: true, message: 'Le status de la facture est invalide' });
            else if (err.code === 402)  res.status(400).send({ error: true, message: 'Le comptable n\'existe pas' });
            else if (err.code === 403)  res.status(400).send({ error: true, message: 'Verifier l\'Id de l\'entreprise' });
            else if (err.code === 404)  res.status(400).send({ error: true, message: 'Le numéro de facture est invalide' });
            else if (err.code === 405)  res.status(400).send({ error: true, message: 'Verifier la date de la facture' });
            else Datahelpers.errorHandler(res, err);
        }
    }
    static UpdateBillComptable = async (req: Request, res: Response) => {
        try {
            const { id, status, userId, billNum, currency, deadline } = req.body;
            // Récupération de toutes les données du body
            const services: Array<BillServiceI> = req.body.services;
            // Vérification de si toutes les données nécessaire sont présentes
            if (!id) throw new Error('Missing id field');

            // Vérification de si la facture existe
            const bill: any = await BillComptable.findOne({_id: mongoose.Types.ObjectId(id)});
            if (!bill) throw new Error('Invalid bill id');

            // Vérification de la validité du status
            if (status && !Datahelpers.billStatus(status)) throw new Error('Invalid bill status');

            // Vérification de si le client existe
            if (userId) {
                const comptable: any = await ComptableModel.findOne({_id: mongoose.Types.ObjectId(userId)});
                if (!comptable) throw new Error('Invalid customer id');
            }

            // Vérification de la validité du numéro de facture
            if (billNum && billNum !== bill.billNum && !await Datahelpers.CheckBillNumber(billNum)) throw new Error('Invalid bill number');

            // Vérification de la validité de la date d'échéance
            if (deadline && !Datahelpers.CheckDeadline(deadline)) throw new Error('Invalid deadline');

            // Vérification de la validité des articles et mise à jour du prix HT et TTC
            let STotalHT = 0;
            if (services) {
                for (const service of services) {
                    if (!service.serviceId || !service.duree) throw new Error('Invalid article format');
                    const serviceFind: any = await Service.findOne({_id: mongoose.Types.ObjectId(service.serviceId)});
                    console.log(serviceFind)
                    if (!serviceFind) throw new Error('Some service id are invalid');
                    STotalHT += (serviceFind.price * service.duree);
                }
            }

            // Création des données existante à modifier
            const updateBillC: any = {};

            if (status) updateBillC.status = bill.status = status;
            if (userId) updateBillC.userId = bill.userId = userId;
            if (billNum) updateBillC.billNum = bill.billNum = billNum;
            if (services) {
                updateBillC.services = bill.services = services;
                updateBillC.STotalHT = STotalHT.toFixed(2);
            }
            if (currency) updateBillC.currency = bill.currency = currency;
            if (deadline) updateBillC.deadline = bill.deadline = deadline;

            // Modification de la facture
            await updateBillComptable(bill, updateBillC);

            // Récupération de la facture avec les services
            const billComptable: any = await BillComptable.findOne({_id: mongoose.Types.ObjectId(id)});

            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'Bill successfully updated', bill: billComptable });
        } catch (err) {
            if (err.code === 400)  res.status(400).send({ error: true, message: 'Une des données important sont manquants' });
            else if (err.code === 401)  res.status(400).send({ error: true, message: 'Le status de la facture est invalide' });
            else if (err.code === 401)  res.status(400).send({ error: true, message: 'Le status de la facture est invalide' });
            else if (err.code === 402)  res.status(400).send({ error: true, message: 'Le comptable n\'existe pas' });
            else if (err.code === 403)  res.status(400).send({ error: true, message: 'Verifier l\'Id de l\'entreprise' });
            else if (err.code === 404)  res.status(400).send({ error: true, message: 'Le numéro de facture est invalide' });
            else if (err.code === 405)  res.status(400).send({ error: true, message: 'Verifier la date de la facture' });
            else Datahelpers.errorHandler(res, err);
        }
    }

    static getBill = async (req: Request, res: Response) => {
        try {
            const allBill: any = await Bill.find({}).populate('clientId');
            if(!allBill) throw {code : 400}
            res.status(200).send({ error: true, Client: allBill });
        } catch (err) {
            if (err.code === 400) res.status(401).send({ error: true, message: 'Il n\'y a pas de facture' });
        }
    }
    static getOneBill = async (req: Request, res: Response) => {
        try {
        const { id } = req.params;
        const bill: any = await Bill.findOne({_id : id}).populate('clientId');
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