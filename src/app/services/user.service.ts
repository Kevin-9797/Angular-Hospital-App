import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser, LoginUser, Token } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.baseUrl;
  constructor( private http:HttpClient ) { }

  createUser( userData: RegisterUser ){
    
    return this.http.post(this.baseUrl + '/users', userData )

  }

  loginGoogle( token:string ){
    const data:Token = {
      token
    }

    return this.http.post(`${this.baseUrl}/auth/google`,data)

  }
  loginUser( userData: LoginUser ){

    return this.http.post( this.baseUrl + '/auth/login',userData );
  }

}
