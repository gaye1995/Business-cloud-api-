const { Schema } = require('mongoose');
import { UsersInterface } from "../interfaces/UsersInterface";

    export class UserModels implements UsersInterface {
    prenom: string;
    nom: string;
    email: string;
    password: string;
    access_token:string;
    refresh_token:string;
    createdAt: Date;
    updatedAt : Date;

    constructor(prenom: string, nom: string, email:string,password: string) {
        this.prenom = prenom;
        this.nom = nom;
        this.email = email;
        this.password = password;
        this.access_token  = '';
        this.refresh_token = '';
        this.createdAt = new Date();
        this.updatedAt = new Date();
        
    }
}