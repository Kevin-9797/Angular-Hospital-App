import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatListModule} from '@angular/material/list';
import {
  MatMenuModule,

} from '@angular/material/menu';
import {
  MatInputModule
} from '@angular/material/input';
import {
  MatFormFieldModule,
} from '@angular/material/form-field';
import {
  MatDialogModule,

} from '@angular/material/dialog';
import {
  MatAutocompleteModule

} from '@angular/material/autocomplete';
import {
  MatSnackBarModule,

} from '@angular/material/snack-bar';

import { 
  MatSelectModule,

} from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
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
    MatListModule,
    MatTableModule,
    MatPaginatorModule
    ]
})
export class MaterialModule { }
