export interface LoginUser {
    name?: string;
    email: string;
    password: string;
}
export interface RegisterUser extends LoginUser {
    
    password2?: string;
    terms?: boolean;
    img?: string;
}


export interface UpdataUser  {
    name?: string;
    email?: string;
    img?: string;
    role: string;
}

export interface Token {
    token:string;
}