export interface BanqueInterface {
    _id: string;
    name: string;
    libelle: string;
    libelle_comptable?: string;
    iban: string;
    bic: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
    currency?: string;
    token?: string;
    email?: string;
    phone?: string;
    fax?: string,
    lastname?: string;
    firstname?: string;
}

export interface BanqueInterfaceJson {
    name: string;
    libelle: string;
    libelle_comptable?: string;
    iban: string;
    bic: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
    currency?: string;
    token?: string;
    email?: string;
    phone?: string;
    fax?: string,
    lastname?: string;
    firstname?: string;
}


export interface EditBanque {
    _id: string;
    name: string;
    libelle: string;
    libelle_comptable?: string;
    iban: string;
    bic: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
    currency?: string;
    token?: string;
    email?: string;
    phone?: string;
    fax?: string,
    lastname?: string;
    firstname?: string;
}
