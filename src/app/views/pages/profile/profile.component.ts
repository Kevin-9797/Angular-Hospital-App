import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { DataInput } from '../../../auth/interfaces/components.interface';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user:User = new User('','');
  public file!:File;
  hidePassword:boolean = false;
  formProfile: FormGroup = new FormGroup({})     
  imagePath: string = 'assets/images/avatar_image.jpg';

  constructor( private userService:UserService ,private fileUpload:FileUploadService ) {


              }

   dataInput!:DataInput[]
  

  ngOnInit(): void {
    this.user = this.userService.user;
    this.dataInput =  [
      {
  
        name: 'email',
        label: 'Email',
        value: this.user.email ,
        type: 'email',
        validators: [ Validators.required,Validators.email ]
      },
      {
        name: 'name',
        label:'Name',
        value: this.user.name ,
        type: 'text',
        validators: [ Validators.required, ]
      }
    ]
    this.dataInput.forEach( e => {

      this.formProfile.addControl(e.name,new FormControl(e.value,e.validators))
    })
    
  }
  myErrorForm(controlName: string, errorName: string){
    return this.formProfile.controls[controlName].hasError(errorName);

 }

  updateProfile(){
    this.userService.updateProfile(this.formProfile.value)
            .subscribe({
              next: resp => {
                console.log(resp);
              },
              error: err => {
                Swal.fire('Error',err.msg,'error')
              }
            })
  }


  changeImg( event:any ){
    this.file = event.target.files[0];
  }

  uploadImg(){  
    console.log('upload img')

    if(this.file){

      this.fileUpload.updateImg(this.file,'users',this.user.uid!)
              .subscribe({
                next: resp => {
                  console.log(resp)
                },
                error: err => {
                  console.log(err)
                  Swal.fire('Error',err.msg,'error')
  
                }
              })


    }else{

      Swal.fire('Error','File not exist','error')


    }

  }

}
