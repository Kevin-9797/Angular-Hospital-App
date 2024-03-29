import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { DataInput, DataInputCheckbox } from '../../interfaces/components.interface';
import { Task } from '../../../material/interfaces/material.interface';
import { validatePassword } from 'src/app/validators/auth.validators';
import { UserService } from '../../../services/user.service';
import { acceptTerms } from '../../../validators/auth.validators';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from 'uuid';
import { RegisterUser } from '../../../interfaces/user.interface';
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
      id: uuidv4(),
      name:'username',
      label: 'Username',
      value: 'kevin',
      type:'text',
      validators: [Validators.required,Validators.maxLength(8)]
    },
    {
      id: uuidv4(),
      name: 'email',
      label: 'Email',
      value: 'kevin@kevin.com',
      type: 'email',
      validators: [Validators.required,Validators.pattern(this.emailRegex)]
    },
    {
      id: uuidv4(),
      name:'password',
      label: 'Password',
      value: 'kevin',
      type:'password',
      validators: [Validators.required]
    },
    {
      id: uuidv4(),
      name:'password2',
      label: 'Password Repeat',
      value: 'kevin' ,
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
    const data: RegisterUser = {
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
