import { Request, Response } from 'express';
import { UserModel } from '../models/UsersModel';


export class EmployeeController {
static getEmployee = async (req: Request, res: Response) => {
    try {
        const allEmployee : any = await UserModel.find({role: "Gérant" || "Employee"});
        res.status(200).send({error: true, user: allEmployee });
    } catch (err) {
        if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
    }
}
}