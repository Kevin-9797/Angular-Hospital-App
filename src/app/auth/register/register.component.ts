import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { DataInput, DataInputCheckbox } from '../interfaces/components.interface';
import { Task } from '../../material/interfaces/material.interface';
import { validatePassword } from 'src/app/validators/auth.validators';
import { UserService } from '../../services/user.service';
import { acceptTerms } from '../../validators/auth.validators';
import swal from 'sweetalert2'; 
import Swal from 'sweetalert2';
import { UserData } from '../../interfaces/user.interface';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
  
})
export class RegisterComponent implements OnInit {

  public formRegister:FormGroup = new FormGroup({});
  task: Task = {
    name: '¿Do you accept the terms and conditions?',
    completed: false,
    color: 'accent',
  };
  emailRegex:RegExp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
  isChecked:boolean = false;
  formSubmitted:boolean = false;
  hidePassword: boolean = false;
  dataInput: DataInput[] = [
    {
      name:'username',
      label: 'Username',
      type:'text',
      validators: [Validators.required,Validators.maxLength(8)]
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validators: [Validators.required,Validators.pattern(this.emailRegex)]
    },
    {
      name:'password',
      label: 'Password',
      type:'password',
      validators: [Validators.required]
    },
    {
      name:'password2',
      label: 'Password Repeat',
      type:'password',
      validators: [Validators.required]
    },
  ] 

  dataInputCheckbox: DataInputCheckbox = {
    name: 'terms',
    validators: [ Validators.required ],
    valueCheckbox: false
  }


  constructor(  private userService:UserService   ) {

   }


  ngOnInit(): void {
    
    this.dataInput.forEach( data => {
      this.formRegister.addControl(data.name,new FormControl(data.value,data.validators))
    })
    this.formRegister.addValidators([validatePassword,acceptTerms]);
    this.formRegister.addControl(this.dataInputCheckbox.name,new FormControl(this.dataInputCheckbox.value,this.dataInputCheckbox.validators))
    
  }

  passwordsSame( name: string,nameError: string ): boolean {
  
      console.log(this.formRegister.hasError(nameError))
      if(name === 'password2'){
        return this.formRegister.hasError(nameError);
        
      }else{
        return false
      }


  }

  myErrorForm(controlName: string, errorName: string){
    return this.formRegister.controls[controlName].hasError(errorName);
 }

  register(){

    if(this.formRegister.invalid){
      return;
    }
    const { username:name,email,password } = this.formRegister.value;
    const data:UserData = {
      name,
      email,
      password
    }
    this.userService.createUser(data)
                    .subscribe({
                      next: resp => {
                        console.log(resp)
                      },
                      error: err => {
                        console.log(err)
                        Swal.fire('Error',err.error.msg,'error');

                      }
                    })
    

  }


  








}
