import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, OnInit } from '@angular/core';
import { RegisterUser, LoginUser, Token, UpdataUser } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';
import { map, tap, Observable, catchError, of, switchMap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
declare const google:any;


@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{
  private zone!: NgZone;
  public user!:User;
  private userDataSubject!: BehaviorSubject<User>;
  public userData!: Observable<User>;
  baseUrl: string = environment.baseUrl;
  constructor( private http:HttpClient,private router:Router ) { 
    this.googleInit();
    this.userDataSubject = new BehaviorSubject<User>({ name: '', email:'',imgUrl:''});
    this.userData = this.userDataSubject.asObservable(); 
  }
  
  ngOnInit(): void {
   
    
  }
  get token():string{
    return localStorage.getItem('token') || '';
  }

  set setUser( user:User ){
    this.user = user;
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
    console.log(data)
    data = {
      ...data,
      role: this.user.role || ''
    }
    return this.http.put(`${this.baseUrl}/users/${ this.user.uid }`,data,{
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
        localStorage.setItem('token',resp.token)
        const {
          email,
          isGoogle,
          name,
          role,
          img
        } = resp.user;
        this.user = new User( name,email,'',role,isGoogle,img,resp.uid );
        this.userDataSubject.next(this.user);
        console.log(this.user)

      }),
      map( resp => true ),
      catchError( error => of(false) )
    )

  }

}
