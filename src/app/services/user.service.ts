import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterUser, LoginUser, Token, UpdataUser } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';
import { map, tap, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
declare const google:any;


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private zone!: NgZone;
  public user!:User;
  baseUrl: string = environment.baseUrl;
  constructor( private http:HttpClient,private router:Router ) { 
    this.googleInit();
  }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  createUser( userData: RegisterUser ){
    
    return this.http.post(this.baseUrl + '/users', userData )

  }
  googleInit(){
    return new Promise<void>( resolve => {

      google.accounts.id.initialize({
        client_id: "119448347446-pu5svvp9q1e0c66d6adi00ts7jrugu6f.apps.googleusercontent.com",
        cookiePolicy: 'single_host_origin'
        //OJO DATO IMPORTANTE!! si queremos que this apunte al componente y no al objeto de google
        // tenemos que pasarle la response como parametro de callback para no perder la referencia 
      });

      resolve();
      
    });


  }


  updateProfile( data:UpdataUser ){
    data = {
      ...data,
      role: this.user.role || ''
    }
    return this.http.put(`${this.baseUrl}/auth/google/${ this.user.uid }`,data,{
      headers: {
        'x-token': this.token,
      }
    })



  }

  loginGoogle( token:Token ){
 
    return this.http.post(`${this.baseUrl}/auth/google`,token)
                .pipe(
                  
                  tap(( resp:any ) => {
                    localStorage.setItem('token',resp.token)
                  })
                )

  }
  loginUser( userData: LoginUser ){

    return this.http.post( this.baseUrl + '/auth/login',userData )
    .pipe(
      tap(( resp:any ) => {
        localStorage.setItem('token',resp.token)
      })
    );
  }

  tokenValidate():Observable<Boolean>{
    return this.http.get(`${this.baseUrl}/auth/renew`,{
      headers: {
        'x-token': this.token,
      }
    }).pipe(
      map( ( resp:any ) => {
        const {
          email,
          isGoogle,
          name,
          role,
          img
        } = resp.user;
        this.user = new User( name,email,'',role,isGoogle,img,resp.uid );
        console.log(this.user)
        localStorage.setItem('token',resp.token)
      }),
      map( resp => true ),
      catchError( error => of(false) )
    )

  }

}
