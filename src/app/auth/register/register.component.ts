import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataInput, DataInputCheckbox } from '../interfaces/components.interface';
import { Task } from '../../material/interfaces/material.interface';

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
  isChecked:boolean = false;
  formSubmitted:boolean = false;
  hidePassword: boolean = false;
  dataInput:DataInput[] = [
    {
      name:'Username',
      type:'text',
      validators: [Validators.required,Validators.maxLength(8)]
    },
    {
      name: 'Email',
      type: 'email',
      validators: [Validators.required,Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]
    },
    {
      name:'Password',
      type:'password',
      validators: [Validators.required,Validators.maxLength(8)]
    },
    {
      name:'Password Repeat',
      type:'password',
      validators: [Validators.required]
    },
  ] 

  dataInputCheckbox:DataInputCheckbox = {
    name: 'terms',
    validators: [Validators.required, ],
    valueCheckbox: false
  }


  constructor(   ) { }


  ngOnInit(): void {
    
    this.dataInput.forEach( data => {
      this.formRegister.addControl(data.name,new FormControl(data.value,data.validators))
    })
    this.formRegister.addControl(this.dataInputCheckbox.name,new FormControl(this.dataInputCheckbox.value,this.dataInputCheckbox.validators))
    
    
  }


  myErrorForm(controlName: string, errorName: string){
    return this.formRegister.controls[controlName].hasError(errorName);

 }

  register(){



  }





}
