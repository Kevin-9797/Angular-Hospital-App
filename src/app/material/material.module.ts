import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'; 
import {MatFormFieldModule, MatInputModule } from '@angular/material'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatListModule} from '@angular/material/list'
import { 
  MatMenuModule,
  MatSelectModule,
  MatSnackBarModule,
  MatDialogModule,
  MatAutocompleteModule

} from '@angular/material';
@NgModule({
  declarations: [],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatListModule
    ]
})
export class MaterialModule { }
