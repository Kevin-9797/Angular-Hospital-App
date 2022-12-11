import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatDrawer } from '@angular/material/sidenav';
import { User } from '../../models/user.model';
import { ViewsService } from '../../services/views.service';
declare const gapi: any;//this line should be at the very top of your TS file

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public auth2: any;
  public imgUrl:string = '';
  user!:User;
  isShowing:boolean = false;
  events: string[] = [];
  opened!: boolean;
  imagePath: string = 'assets/images/avatar_image.jpg';
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor( private router:Router, private userService:UserService,private viewsService:ViewsService) {
      this.imgUrl = this.userService.user.imgUrl;
      this.user = this.userService.user;
   }


  ngOnInit(): void {


  }
  toogleSidenav(){
    this.viewsService.toggle();
  }

  logout(){
    
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
    
  }

}
