import { Request, Response } from 'express';
import { Client } from '../models/ClientModel';
import { UserExpense } from '../models/DepenseModel';

export class ClientController {
    static createBilanActif = async (req: Request, res: Response) => {
        try {
            const allUserExpense: any = await UserExpense.find({});


        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
        }
        
    }


    static actif = async (req: Request, res: Response) => {
        try {
           
        
            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'The user has been successfully created'});
        } catch (err) {
        }

    } 
    
}