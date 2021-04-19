import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { UserModel } from '../models/UsersModel';


export class EmployeeController {
static getEmployee = async (req: Request, res: Response) => {
    try {
        const allEmployee : any = await UserModel.find({role: "Gérant" || "Développeur" });
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
}