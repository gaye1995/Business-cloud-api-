import express, { Request, Response, NextFunction } from 'express';
import jsonwebtoken, { JwtHeader, VerifyOptions } from 'jsonwebtoken';
import { config } from 'dotenv';
import { updateUser } from '../helpers/checkFunction/editUser';

config();

const JWT_KEY: string = process.env.JWT_KEY ;
export const getToken = async (authHeader: any) =>{
    try{
        return await authHeader.replace(/^Bearer/i, "").trim();   
    }catch
    {
        return false;
    }
}
export const getJwtPayload = async(token: string): Promise < any | null > => {
    try {
        const jwtObject = jsonwebtoken.verify(token, JWT_KEY);
        if (jwtObject) {
            return jwtObject;
        }
    } catch (err) {}
    return null;
};
export const getAuthToken = async (user: any) => {
    const token = jsonwebtoken.sign({ _id: user._id, email: user.email }, JWT_KEY, { expiresIn: '24h' })
    user.token = token;
    await updateUser(user, { token: user.token });
    return user;
};