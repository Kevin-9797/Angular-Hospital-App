import { Component, OnInit,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ViewsService } from '../../services/views.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styles: [
    `
    .app-drawer-container{
      flex:1;
    }
   
    .sidenav{
      height: 100vh;
    }
    `
    
  ]
})
export class DrawerComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private viewService: ViewsService, private router:Router ) 
  {

  }

  ngOnInit() {
      /**
      When you reveive order to open / close sidenav.
      **/
      this.viewService.asObservable().subscribe((isOpen: boolean) => {
                  console.log( isOpen )
                  if(isOpen) {
                      this.sidenav.close();
                  }
                  else{
                      this.sidenav.open();
                  }
          });
          
  }

  toogleSidenav(){
    this.viewService.toggle();
  }

}
