import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table'
import { DataSource } from '@angular/cdk/table';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit   {

  spinnerActive: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  constructor( private userService:UserService  ){}

  public users: User [] = [];
  public totalUser!:Number ;
  public displayedColumns: [] = [];
  public columnNames: any = [{
    id: 'position',
    value: 'No.',

  }, {
    id: 'name',
    value: 'Name',
  },
    {
      id: 'weight',
      value: 'Weight',
    },
    {
      id: 'symbol',
      value: 'Symbol',
    }];


  ngOnInit(): void {
    
    


    this.displayedColumns = this.columnNames.map(( x:any ) => x.id);

    this.userService.loadUsers(0)
            .subscribe({
              next: ( { total,users } ) => {
                  this.users = users;
                  this.totalUser = total
              },
              error: err => {
                Swal.fire('Error', err.msg ,'error')
              }
            })
    
  }


  





}