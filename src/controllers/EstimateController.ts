import { Request, Response } from 'express';
import { Estimate } from '../models/EstimateModel';
import mongoose from 'mongoose';
import Datahelpers from '../helpers/Datahelpers';


export class EstimateController {
    static getOneEstimate = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const estimate: any = await Estimate.findOne({ _id: mongoose.Types.ObjectId(id) });
            if (!estimate) throw { code: 400 }
            res.status(201).send({ error: false, Message: "Devis numéro : " + estimate.estimateNum, estimate });
        } catch (err) {
            if (err.code === 400) res.status(401).send({ error: true, message: 'le devis n\'existe pas' });
        }
    }
    static getEstimatebyClient = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const allEstimateByClient: any = await Estimate.find({ clientId: id });
            if (!allEstimateByClient) throw { code: 400 }
            res.status(200).send({ error: false, Estimate: allEstimateByClient });
        } catch (err) {
            if (err.code === 400) res.status(401).send({ error: true, message: 'Il n\'y a pas de devis' });
        }
    }
    static getEstimate = async (req: Request, res: Response) => {
        try {
            const allEstimate: any = await Estimate.find({});
            if (!allEstimate) throw { code: 400 }
            res.status(200).send({ error: false, Devis: allEstimate });
        } catch (err) {
            if (err.code === 400) res.status(401).send({ error: true, message: 'Il n\'y a pas de Devis' });
        }
    }
    static deleteEstimate = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const estimate: any = await Estimate.findOne({ _id: id });
            if (!estimate) throw { code: 400 };
            await Estimate.deleteOne(estimate);
            res.status(201).send({ error: false, Message: "Devis supprimer avec sucess" });
        } catch (err) {
            if (err.code === 400) res.status(401).send({ error: true, message: 'Le devis n\'existe pas' });
            else Datahelpers.errorHandler(res, err);
        }
    }
}