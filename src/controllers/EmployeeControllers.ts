import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { UserExpense } from '../models/NoteDeFraisModel';
import { UserModel } from '../models/UsersModel';


export class EmployeeController {
static getEmployee = async (req: Request, res: Response) => {
    try {
        const allEmployee : any = await UserModel.find({});
        if(!allEmployee) throw {code : 400}
        res.status(200).send({error: true, employées: allEmployee });
    } catch (err) {
        if (err.code === 400) res.status(400).send({ error: true, message: 'il n\'y a pas d\'employée' });
    }
}
// recuperation d'un comptable (user)
static getOneEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const oneEmployee : any = await UserModel.find({_id: mongoose.Types.ObjectId(id)});
        if(!oneEmployee) throw {code : 400}
        res.status(200).send({ error: false, employée: oneEmployee });
    } catch (err) {
        if (err.code === 400) res.status(400).send({ error: true, message: 'Cette employées n\'existe pas' });
    }
}
    static getUserExpense = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) throw { code: 400 }
            const userexpense: any = await UserExpense.findOne({ _id: mongoose.Types.ObjectId(id) });
            const userExpenses: any = userexpense.userId;
            const user: any = await UserModel.findOne({ _id: mongoose.Types.ObjectId(userExpenses) });
            console.log(user)
            res.status(200).send({ error: false, message: userexpense });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'le parametre id est manquant' });
        }
    }
}