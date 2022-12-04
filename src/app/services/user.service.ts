import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser, LoginUser, Token } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';
import { map, tap, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public google:any;


  baseUrl: string = environment.baseUrl;
  constructor( private http:HttpClient,private router:Router ) { 
    this.googleInit();
  }

  createUser( userData: RegisterUser ){
    
    return this.http.post(this.baseUrl + '/users', userData )

  }
  googleInit(){
    return new Promise<void>( resolve => {

      this.google.accounts.id.initialize({
        client_id: "119448347446-pu5svvp9q1e0c66d6adi00ts7jrugu6f.apps.googleusercontent.com",
        cookiePolicy: 'single_host_origin'
        //OJO DATO IMPORTANTE!! si queremos que this apunte al componente y no al objeto de google
        // tenemos que pasarle la response como parametro de callback para no perder la referencia 
      });

      resolve();
      
    });


  }

  logout(){
    localStorage.removeItem('token');
    this.google.signOut().then( () => {
      this.router.navigateByUrl('auth/login');
      
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
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${this.baseUrl}/auth/renew`,{
      headers: {
        'x-token': token,
      }
    }).pipe(
      tap( ( resp:any ) => {
        console.log(resp.token)
        localStorage.setItem('token',resp.token)
      }),
      map( resp => true ),
      catchError( error => of(false) )
    )

  }

}
