import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from './shared/modal/modal.component';



@NgModule({
  declarations: [
    InputComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    InputComponent,
    ModalComponent
  ]
})
export class ComponentsModule { }
