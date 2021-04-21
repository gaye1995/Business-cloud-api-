export interface UsersInterface {
        _id: string;
        name: string;
        email: string;
        password: string;
        role: string;
        phone?: string;
        birthdayDate?: string;
        avatar?: string;
        address?: string;
        zip?: string;
        city?: string;
        country?: string;
        createdAt: Date;
        updatedAt: Date;
        currency?: string;
        token?: string;
        reset_password?: { token: string, date: number };
        verify_email?: { code: number, date: number, verified: boolean };
    }
    
export interface UsersInterfaceJson {
        name: string;
        email: string;
        role: string;
        phone?: string;
        birthdayDate?: string;
        avatar?: string;
        address?: string;
        zip?: string;
        city?: string;
        country?: string;
}
export interface ClientInterface {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    birthdayDate?: string;
    avatar?: string;
    address?: string;
    zip?: string;
    city?: string;
    country?: string;
    numTVA?: string;
    numSIRET?: string;
    numRCS?: string;
    createdAt: Date;
    updatedAt: Date;
    post?: string;
    currency?: string;
    token: string;
}
export interface ClientInterfaceJson {
    name: string;
    email: string;
    phone?: string;
    birthdayDate?: string;
    avatar?: string;
    address?: string;
    zip?: string;
    city?: string;
    country?: string;
    numTVA?: string;
    numSIRET?: string;
    numRCS?: string;
    createdAt: Date;
    updatedAt: Date;
    post?: string;
}
    
export interface EditUser {
    _id?: string;
    name?: string;
    phone?: string;
    email?: string;
    avatar?: string;
    password?: string;
    birthdayDate?: string;
    reset_password?: { token: string, date: number };
    verify_email?: { code: number, date: number, verified: boolean };
    token?: string;
    refreshToken?: string;
    attempt?: number;
    lastLogin?: number;
    createdAt?: Date;
    updatedAt?: Date;
    currency?: string;
}
