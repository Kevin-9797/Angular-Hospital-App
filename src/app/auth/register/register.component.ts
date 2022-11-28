import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
  
})
export class RegisterComponent  {

  public registerForm: FormGroup = this.fb.group({
  
    name: [ 'Kevin',[ Validators.required,Validators.minLength(3)]],
    email: [ 'Kevin',[ Validators.required,Validators.minLength(3)]],
    password: [ 'Kevin',[ Validators.required,Validators.minLength(3)]],
    password2: [ 'Kevin',[ Validators.required ]],
    term: [ false,[ Validators.required ]],

  })
  


  constructor( private fb:FormBuilder  ) { }




}
