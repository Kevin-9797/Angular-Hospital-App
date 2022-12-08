import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material';
import { Task } from 'src/app/material/interfaces/material.interface';
import { DataInput, DataInputCheckbox } from '../../interfaces/components.interface';
import { UserService } from '../../../services/user.service';
import { LoginUser, Token } from '../../../interfaces/user.interface';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from 'uuid';
import { tap, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingService } from '../../../services/loading.service';
import { delay } from 'rxjs/operators';
declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 

})

export class LoginComponent implements OnInit ,AfterViewInit{

  spinnerActive: boolean = true;

  task: Task = {
    name: '¿Do you accept the terms and conditions?',
    completed: false,
    color: 'accent',
  };
  formLogin: FormGroup = new FormGroup({})     
  formSubmitted:boolean = false;
  hidePassword:boolean = false;
  isSpinner:boolean = false;
  rememberMe: boolean = false;
  dataInput:DataInput[] = [
    {

      name: 'email',
      label: 'Email',
      value: 'kevin@gmail.com' || '',
      type: 'email',
      validators: [ Validators.required,Validators.email ]
    },
    {
      name: 'password',
      label:'Password',
      value: 'kevin' || '',
      type: 'password',
      validators: [ Validators.required, ]
    }
  ]


  @ViewChild('googleBtn') googleBtn!: ElementRef;

  constructor( private fb:NonNullableFormBuilder,
               private userService:UserService,
               private router:Router,
               private spinnerHandler:LoadingService,
               private _loading: LoadingService,
               private cdr: ChangeDetectorRef,
               
    ) {
      this.spinnerHandler.showSpinner.subscribe(this.showSpinner.bind(this));
     }
  
  
  ngOnInit(): void {
    
    
    this.dataInput.forEach( e => {

      this.formLogin.addControl(e.name,new FormControl(e.value,e.validators))
    })
    
  }
  

    ngAfterViewInit(): void {
      this.googleInit();
    }
    showSpinner = (state: boolean): void => {
      this.spinnerActive = state;
    };
  
  googleInit(){
      google.accounts.id.initialize({
        client_id: "119448347446-pu5svvp9q1e0c66d6adi00ts7jrugu6f.apps.googleusercontent.com",
        callback: ( response:any ) =>  this.loginGoogle(response)  
        //OJO DATO IMPORTANTE!! si queremos que this apunte al componente y no al objeto de google
        // tenemos que pasarle la response como parametro de callback para no perder la referencia 
      });
      google.accounts.id.renderButton(
        this.googleBtn.nativeElement,
        { 
          theme: "dark",
          size: "large",
          longTitle: true,
          width: 100,

       }  
       // customization attributes
        );
    }

  loginGoogle( res:any ){

    
    const data:Token = {
      token: res.credential
    }

    this.isSpinner = true;
    this.userService.loginGoogle( data ) 
                    .subscribe({
                      next: (resp: any) =>{
                        console.log(resp)
                        this.router.navigate(['/views']);
                        
                      
                      },
                      error: err => {
                        Swal.fire('Error',err.error.msg,'error');

                      }
                    });




  }



  myErrorForm(controlName: string, errorName: string){
       return this.formLogin.controls[controlName].hasError(errorName);

    }

  login(){
      this.formSubmitted = true;


      const { email,password } = this.formLogin.value;

      const data:LoginUser = {
          email,
          password
      }
      console.log(data)
      this.userService.loginUser(data)
                      .pipe(
                      )
                      .subscribe({
                        next: resp => {
                          console.log(resp);

                          this.router.navigate(['/views']);
                        },
                        error: err => {

                          console.log(err);
                          Swal.fire('Error',err.error.msg,'error');

                        }
                      })




  }



}
