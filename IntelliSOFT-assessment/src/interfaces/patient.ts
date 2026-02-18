export interface Patient{
    _id?: string, 
    unique:string,
    firstname:string,
    lastname:string,
    dob:string,
    gender:string,
    created_at?:string,
    updated_at?:string,
}

export interface PatientWithId extends Patient {
    id:string 
}

export interface PatientNav extends Patient{
    bmi:number,
    category:string,
}

export interface Vitals {
    _id?: string;
    patientId: string;
    height: number; // in cm
    weight: number; // in kg
    bmiStatus?: string; // auto calculated
    createdAt?: string;
    updatedAt?: string;
}

export interface Assessment {
    _id?: string;
    patientId: string;
    healthStatus: "Good" | "Bad";
    onDiet?: "Yes" | "No" | "N/A";
    onDrugs?: "Yes" | "No" | "N/A";
    visitDate: string; // Date String
    createdAt?: string;
    updatedAt?: string;
}