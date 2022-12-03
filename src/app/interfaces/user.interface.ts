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

export interface Token {
    token:string;
}