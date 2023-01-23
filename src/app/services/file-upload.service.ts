import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  baseUrl: string = environment.baseUrl;

  constructor( private http:HttpClient, private userService:UserService ) { }


 
  updateImg(
    archive: File,
    type: 'users' | 'medicals' | 'hospitals',
    id?: string
  ): Observable<any> {
    const url = `${ this.baseUrl }/uploads/${ type }/${ id }`;
    const formData: FormData = new FormData();
    console.log(formData)
    formData.append('file', archive, archive.name);
    console.log(url)
    
    return this.http.post(url, formData, { reportProgress: true, headers: { 'x-token': this.userService.token } })
      .pipe(
        map( ( resp:any ) => resp )
      );

  }



}



