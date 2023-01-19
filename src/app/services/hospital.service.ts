import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Hospital } from '../models/hospital.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  baseUrl: string = environment.baseUrl;


  constructor( private http: HttpClient) { }



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

  loadHospitals( start: number ){
    const url: string = `${ this.baseUrl }/hospitals?start=${ start }`;
    return this.http.get< { ok:boolean, hospitals: Hospital[] } >( url , this.headers )
                        .pipe(
                          map( (resp: { ok:boolean, hospitals: Hospital[] }) => resp.hospitals )
                        )
         

  }


}
