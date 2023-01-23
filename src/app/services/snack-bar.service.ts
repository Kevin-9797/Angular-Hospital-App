import { Injectable, NgZone, ViewContainerRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/shared/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar, private zone: NgZone) {}


  public openSnackBar( entry: ViewContainerRef, message: string,  snackType?: 'Success' | 'Info' | 'Error' | 'Warn') {

    const _snackType: 'Success' | 'Info' | 'Error' | 'Warn' =
      snackType !== undefined ? snackType : 'Success';
      this.zone.run(() => {
              this.snackBar.openFromComponent(SnackBarComponent, {
                duration: 4000,
                horizontalPosition: 'start',
                verticalPosition: 'top',
                panelClass: 'snack-bar',
                viewContainerRef: entry,
                data: { message, snackType: _snackType }
              });
    });
  }
}
