import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchsService {
 public baseUrl: string = environment.baseUrl;

 constructor( private http:HttpClient ) { }

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


  search( type: 'users' | 'hospitals' | 'medicals',term: string ){

    const url = `${ this.baseUrl }/search/${ type }/${ term }`;


    return this.http.get( url , this.headers )
            .pipe(
              map( ( resp: any ) => {
                return resp.results
              })
            )
  }

}
