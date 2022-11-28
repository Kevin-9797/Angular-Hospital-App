import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material';
import { Task } from 'src/app/material/interfaces/material.interface';
import { DataInput, DataInputCheckbox } from '../interfaces/components.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 

})

export class LoginComponent implements OnInit {

  // public formLogin:FormGroup = this.fb.group({
  //   name: [],
  //   email: [],
  //   password: []
  // })


  constructor( private fb:FormBuilder ) { }


  task: Task = {
    name: '¿Do you accept the terms and conditions?',
    completed: false,
    color: 'primary',
  };

  formLogin:FormGroup = new FormGroup({})     

  isChecked:boolean = false;

  

  dataInput:DataInput[] = [
    {
      name: 'username',
      value: 'kevin',
      type: 'text',
      validators: [Validators.required,Validators.maxLength(8) ]
    },
    {
      name: 'email',
      value: 'kevin@gmail.com',
      type: 'text',
      validators: [Validators.required,Validators.email ]
    },
    {
      name: 'password',
      value: 'kevin',
      type: 'password',
      validators: [Validators.required, ]
    }
  ]

   
  dataInputCheckbox:DataInputCheckbox = {
    name: 'terms',
    value: '',
    type: '',
    validators: [Validators.required, ],
    valueCheckbox: false
  }
  ngOnInit(): void {
 
    

    this.dataInput.forEach( e => {
      this.formLogin.addControl(e.name,new FormControl(e.value,e.validators))
    })
    this.formLogin.addControl(this.dataInputCheckbox?.name,new FormControl(this.dataInputCheckbox.value,this.dataInputCheckbox.validators))

  }

  isErrorForm( name:string ){

    return ( 
            this.formLogin.get(name)?.touched &&
             this.formLogin.get(name)?.invalid 
    )

  }


  getCheckbox(){


  }
  login(){

      console.log(this.formLogin);

  }






}
