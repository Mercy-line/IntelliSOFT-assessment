export interface Patient{
    unique:string,
    firstname:string,
    lastname:string,
    dob:string,
    gender:string,
    reg_date:string,
    created_at?:string,
    updated_at?:string,
}

export interface PatientWithId extends Patient {
    id:number
}

export interface PatientNav extends Patient{
    bmi:number,
    category:string,
}