import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { DataInput } from '../../../auth/interfaces/components.interface';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!:User;
  hidePassword:boolean = false;
  formProfile: FormGroup = new FormGroup({})     
  imagePath: string = 'assets/images/avatar_image.jpg';

  constructor( private userService:UserService ) {
      this.user = this.userService.user;
   }

   dataInput:DataInput[] = [
    {

      name: 'email',
      label: 'Email',
      value: this.user.email || '',
      type: 'email',
      validators: [ Validators.required,Validators.email ]
    },
    {
      name: 'text',
      label:'Name',
      value: this.user.name || '',
      type: 'text',
      validators: [ Validators.required, ]
    }
  ]
  

  ngOnInit(): void {
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

}
