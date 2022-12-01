import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ComponentsModule } from '../components/components.module';
import { InputComponent } from '../components/input/input.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    RouterModule,
    
  ]
})
export class AuthModule { }
