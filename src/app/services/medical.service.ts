import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Medical } from '../models/medical.model';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {
  baseUrl: string  = environment.baseUrl;

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



  createMedical( medical:Medical ){
    const url:string = `${ this.baseUrl }/medicals/`;

    this.http.post( url, medical ,this.headers);


  }

  updateMedical( medical:Medical ){
    const url: string = `${ this.baseUrl }/medicals/${ medical._id}`;

    this.http.put( url, medical ,this.headers);


  }
}
