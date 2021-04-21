export interface BillComptableInterface {
    billNum: string;
    id: string;
    status: string;
    userId: string;
    entrepriseId: string;
    services?: BillServiceI[];
    currency?: string;
    taxe?: number;
    tva?: number;
    totalHT: number;
    totalTTC: number;
    deadline: string;
    amountPaid?: number;
    payementDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface BillServiceI {
    serviceId: string;
    duree: number;
}

export interface EditBillC {
    billNum: string;
    id: string;
    status?: string;
    userId: string;
    entrepriseId: string;
    service?: BillServiceI[];
    currency?: string;
    taxe?: number;
    tva?: number;
    totalHT?: number;
    totalTTC?: number;
    deadline: string;
    amountPaid?: number;
    payementDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}