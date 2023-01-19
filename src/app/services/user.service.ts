import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, OnInit } from '@angular/core';
import { RegisterUser, LoginUser, Token, UpdataUser, LoadUsers } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';
import { map, tap, Observable, catchError, of, switchMap, BehaviorSubject, delay } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';


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
    this.userDataSubject = new BehaviorSubject<User>({ name: '', email:'',imgUrl:''});
    this.userData = this.userDataSubject.asObservable(); 
  }
  
  ngOnInit(): void {
   
    
  }

  get headers(){
    return {
      headers: {  
      'x-token': this.token,
      }
  }
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



  updateProfile( data:UpdataUser ){
    console.log(data)
    data = {
      ...data,
      role: this.user.role || ''
    }
    return this.http.put(`${this.baseUrl}/users/${ this.user.uid }`,data, this.headers )

  }

  saveUser( user: User ){

    return this.http.put(`${this.baseUrl}/users/${ user.uid }`,user, this.headers )
    
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

  loadUsers( start: number ){
    const url: string = `${ this.baseUrl }/users?start=${ start }`;
    return this.http.get< LoadUsers >( url , this.headers )
            .pipe(
              map( resp => {
                const users = resp.users.map( 
                    
                    user => new User(user.name,user.email,'',user.role,user.isGoogle,user.img,user.uid,user.isDeleted)
                  
                  )
                return {
                  total: resp.total,
                  users
                };
              })
            )


  }

  deleteUser( user:User ){
    
    const url: string = `${ this.baseUrl }/users/${ user.uid }`;

    return this.http.delete( url, this.headers );

  }

  tokenValidate(): Observable<Boolean>{
    return this.http.get(`${this.baseUrl}/auth/renew`,this.headers ).pipe(
      map( ( resp:any ) => {
        localStorage.setItem('token',resp.token)
        const {
          email,
          isGoogle,
          name,
          role,
          img,
          isDeleted
        } = resp.user;
        this.user = new User( name,email,'',role,isGoogle,img,resp.uid,isDeleted );
        this.userDataSubject.next(this.user);
        console.log(this.user)

      }),
      map( resp => true ),
      catchError( error => of(false) )
    )

  }

}
