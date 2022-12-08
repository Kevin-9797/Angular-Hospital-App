import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '03-adminProHospitals';

  constructor(
  ){ }

  ngOnInit() {

  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */

}
