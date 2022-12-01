import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.baseUrl;
  constructor( private http:HttpClient ) { }

  createUser( userData: UserData ){
    
    return this.http.post(this.baseUrl + '/users', userData )

  }


}
