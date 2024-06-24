export interface Iuser {
    firstname:string,
    lastname:string,
    birthday: string,
    email: string,
    address:string,
    city:string,
    country:string,
    state:string,
    phone: string,
    dni: number,
    [id: string]: string | number;
}

export interface IloginUser {
    email: string,
    password: string
}
export interface IregisterUser extends Iuser {
    password: string,
    confirmPassword: string
}