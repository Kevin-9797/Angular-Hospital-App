import { Component,OnDestroy , OnInit, ViewChild, AfterViewInit, ElementRef, ViewContainerRef } from '@angular/core';
import {  MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user.model';
import { SearchsService } from '../../../../services/searchs.service';
import { fromEvent, Subscription } from 'rxjs';
import { map, debounceTime, delay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ModalService } from '../../../../services/modal.service';
import { ColumnsTable } from '../../interfaces/components.interface';
 
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'] 
})
export class UsersComponent implements OnInit,OnDestroy   {

  public spinnerActive: boolean = false;
  @ViewChild( 'paginator' ) paginator!: MatPaginator;
  @ViewChild( 'inputSearch' ,{ static:true } ) inputSearch!:ElementRef;
  @ViewChild( 'alert' ) alertRef!: ElementRef;
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;
  @ViewChild( MatSort ) sort!: MatSort;
  

  public imagePath: string = 'assets/images/avatar_image.jpg';
  public alertActivate: boolean = false;
  public userRoles: string[] = ['USER_ROLE','ADMIN_ROLE']
  public userActive!: User;
  public users: User [] = [];
  public dataSource: any;
  public totalUser!:Number ;
  public pageSize = 5;
  public loading: boolean = true;
  public pageSizeOptions = [5, 10, 25, 50];
  public displayedColumns: ColumnsTable[] = [];
  public columnNames: ColumnsTable[] = [
    {
      id: 'imgUrl',
      value: 'imgUser',
    },
    {
      id: 'name',
      value: 'Name',
    },
    {
      id: 'role',
      value: 'Role',
    },
    {
      id: 'email',
      value: 'email',
    },
    {
      id: 'actions',
      value: 'actions',
    },
    {
      id: 'isDeleted',
      value: 'Deleted',
    }
  ];


  constructor(
    private userService:UserService,
    private searchService: SearchsService,
    private modalService: ModalService
){}

  openModalUploadImg( user: User ){

    this.sub = this.modalService
    .openModal(this.entry, `If you want to change the profile picture of user ${ user.name }`, 'Please click on the icon below', 'file', user)
    .subscribe(( resp:any) => {

    })

  }

  openModal( user:User ) {
    this.sub = this.modalService
      .openModal(this.entry, `Are you sure you want to delete the user ${ user.name } ?`, 'Please , click confirm or close', 'confirmation' )
      .subscribe(( resp:any) => {
        console.log(resp)
        if( resp === 'confirm'){
          this.userService.deleteUser( user )
                          .subscribe({
                            next: resp => {
                              console.log( resp );
                            },
                            error: error => {
                              
                            }
                          })


        } else{
          return;
        }
      });
  }
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
  
  ngOnInit(): void {
    
    
    
    this.searchEvent();
    this.displayedColumns = this.columnNames.map(( x:any ) => x.id);
    this.loading = true;
    this.initLoadUser();
    this.modalService.newImage
                      .pipe(
                        delay(100)
                      )
                      .subscribe(img => {
                          this.initLoadUser();

                      }) //aqui nos suscribrimos al modal para saber si hemos cambiado la foto de algun usuario 

  }

  searchEvent(){

    fromEvent( this.inputSearch.nativeElement , 'input')
    .pipe(
      // Tomamos las letras ingresadas en el input
      map((k: any ) => {
          this.loading = true;
          return k.target['value'];
      }),
      // Seleccionamos un tiempo en milisegundos antes de continuar la ejecución luego de que se presionó la última letra, si hay cambios en el input vuelve a empezar a contar
      debounceTime(1500),
      // Ahora si ejecutamos la busqueda del usuario con el total de letras en el input
      // luego de que se dejara de escribir por 1,5 segundos
    ).subscribe( val => {
      if (val !== '') {
        this.searchService.search( 'users', val )
          .subscribe( ( users: any ) => {
            console.log(users)
            this.users = users;
            this.dataSource = new MatTableDataSource(users);
            this.dataSource.paginator = this.paginator;
            this.loading = false;
          });
      } else {
        this.initLoadUser();
        return;
      }
    });

  }

  changeRole( user: User ){

    this.userService.saveUser( user )
                      .subscribe({
                        next: resp => {
                          console.log(resp);
                        },
                        error: error => {
                          
                        }
                      })

  }

  initLoadUser(){

    this.userService.loadUsers(0) 
    .subscribe({
      next: ( { total,users } ) => {
          setTimeout(() => {
            console.log(users)
            this.users = users;
            this.dataSource = new MatTableDataSource(users);
            this.dataSource.paginator = this.paginator;
            this.totalUser = total
            this.loading = false;

          },3000)

      },
      error: err => {
        Swal.fire('Error', err.msg ,'error')
      }
    })

  }


  onPaginateChange( event: any ){

    console.log(event)


  }

  search ( term:string ){


    this.searchService.search('users', term ).
        subscribe({
          next: resp => {
            console.log( resp );
          },
          error: err => {

          }
        })

  } 





}