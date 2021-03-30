export interface UsersInterface {
        id: string;
        name: string;
        email: string;
        phone?: string;
        birthdayDate?: string;
        reset_password?: { token: string, date: number };
        verify_email?: { code: number, date: number, verified: boolean };
    }
    
    