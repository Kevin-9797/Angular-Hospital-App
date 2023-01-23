import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  constructor( @Inject(MAT_SNACK_BAR_DATA) public data: any ) {
    console.log(data); 
  }

  ngOnInit() {}

  get getIcon(): any {
    switch (this.data.snackType) {

      case 'Success':

        return 'done';
      case 'Error':

        return 'error';
      case 'Warn':

        return 'warning';
      case 'Info':
        
        return 'info';
    }
  }
}
