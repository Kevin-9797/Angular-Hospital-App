import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from './shared/modal/modal.component';
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';



@NgModule({
  declarations: [
    ModalComponent,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ModalComponent,
    SnackBarComponent
  ]
})
export class ComponentsModule { }
