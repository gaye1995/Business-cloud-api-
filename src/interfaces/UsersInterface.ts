export interface UsersInterface {
        _id: string;
        name: string;
        email: string;
        phone?: string;
        birthdayDate?: string;
        reset_password?: { token: string, date: number };
        verify_email?: { code: number, date: number, verified: boolean };
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
