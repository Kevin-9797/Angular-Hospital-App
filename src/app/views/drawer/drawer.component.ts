import { Component, OnInit,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ViewsService } from '../../services/views.service';
import { Router } from '@angular/router';
import { MenuItemService } from '../../services/menu-item.service';
import { MenuItem } from '../../interfaces/components.interface';

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

  menuItem: MenuItem [] = []; 
  constructor(
                      private viewService: ViewsService,
                      private router:Router, 
                      private menuItemService:MenuItemService 
            ) 
  {

  }

  ngOnInit() {

    
      this.menuItem = this.menuItemService.menu;
      this.menuItem;
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

  onClose(){
    this.viewService.toggle();
    this.sidenav.toggle()


  }
  toogleSidenav(){
    this.viewService.toggle();
  }

}
