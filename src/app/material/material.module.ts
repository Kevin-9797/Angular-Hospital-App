import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'; 
import {MatFormFieldModule, MatInputModule } from '@angular/material'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 


@NgModule({
  declarations: [],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
    ]
})
export class MaterialModule { }
