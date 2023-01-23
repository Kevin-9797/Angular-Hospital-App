import { Component, OnInit, ViewContainerRef, ViewChild, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { HospitalService } from '../../../../services/hospital.service';
import { Hospital } from '../../../../models/hospital.model';
import { ModalService } from '../../../../services/modal.service';
import { Subscription, tap, fromEvent, map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { ColumnsTable } from '../../interfaces/components.interface';
import { debounceTime } from 'rxjs/operators';
import { SearchsService } from '../../../../services/searchs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from '../../../../services/snack-bar.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit, OnDestroy {
  @ViewChild( 'paginator' ) paginator!: MatPaginator;
  @ViewChild( MatSort ) sort!: MatSort;
  @ViewChild( 'inputSearch' ,{ static:true } ) inputSearch!: ElementRef;
  @ViewChild( 'inputUpdate' , { static:true } ) inputUpdate!: ElementRef;
  @ViewChild('snackBar', { read: ViewContainerRef }) snackBarRef!: ViewContainerRef; 
  
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

  public hospitals:Hospital[] = [] ;
  public imagePath: string = 'assets/images/avatar_image.jpg';
  public dataSource!: any;
  public loading: boolean = true ; 
  public pageSizeOptions = [5, 10, 25, 50];
  public pageSize: number = 5;
  public displayedColumns: ColumnsTable[] = [];
  public columnNames: ColumnsTable[] = [
    {
      id: 'img',
      value: 'img',
    },
    {
      id: 'name',
      value: 'Name',
    },
    {
      id: 'actions',
      value: 'actions',
    },
  
  ];
  constructor( 
              private hospitalService: HospitalService,
              private modalService: ModalService,
              private searchService: SearchsService,
              private snackBar: SnackBarService
    ) { }

  openModal( hospital:Hospital ) {
      this.sub = this.modalService
        .openModal(this.entry, `Are you sure you want to delete the hospital ${ hospital.name } ?`, 'Please , click confirm or close', 'confirmation' )
        .subscribe(( resp:any) => {
          console.log(resp)

          if( resp === 'confirm'){
            this.hospitalService

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
    this.displayedColumns = this.columnNames.map((x:any) => x.id );
    this.loading = true;
    this.sub = this.modalService.newImage
                    .subscribe( resp => this.loadHospitals() )
    this.loadHospitals();

  }


  searchEvent(){

    fromEvent( this.inputSearch.nativeElement,'input' )
                  .pipe(
                    map((k: any ) => {
                      this.loading = true;
                      return k.target['value'];
                  }),
                    debounceTime(1500),

                  )
                  .subscribe({
                    next: value => {
                      if ( value !== '' ) {

                        this.searchService.search('hospitals',value )
                              .subscribe({
                                next: (hospitals: Hospital[]) => {
                                  if(hospitals.length === 0 ){
                                  
                                    this.hospitals = hospitals;
                                  
                                  }else{

                                    console.log(hospitals)
                                    this.hospitals = hospitals;
                                    this.dataSource = new MatTableDataSource(hospitals);
                                    this.dataSource.paginator = this.paginator;
                                    this.loading = false;

                                  }
                                },
                                error: error => {
                                  console.error(error);
                                  
                                }
                              })
                        }else{
                          this.loadHospitals();
                          return;
                        }
                    },
                    error: error => {
                      console.error(error);
                      
                    }
                  })


  }

  openModalUploadImg( hospital: Hospital ){

    this.sub = this.modalService
    .openModal(this.entry, `If you want to change the profile picture of hospital ${ hospital.name }`, 'Please click on the icon below', 'file', null,hospital)
    .subscribe(( resp:any) => {
        
    })

  }

  addHospital(){
    this.sub = this.modalService
    .openModal(this.entry, `Enter the name of the hospital and then click accept`, '', 'input', null,null)
    .subscribe(( resp:any) => {
        if(resp === 'confirm') this.loadHospitals()
    })


  }

  updateHospital( hospital: Hospital ){

    console.log(hospital._id!)
    this.hospitalService.updateHospital( hospital._id! ,hospital.name )
              .subscribe({
                next: hospital => {
                  console.log(hospital);
                  this.snackBar.openSnackBar( this.snackBarRef ,'Hospital updated successfully','Success')
                  // this.snackBar.open('Snack bar opened', 'OK', {
                  //   viewContainerRef: this.snackBarRef,
                  //   duration: 3000
                  //   });
                },
                error: error => {
                  console.log(error);
                }
              })


  }

  loadHospitals(){
    this.loading = true;
    this.hospitalService.loadHospitals(0)
          .subscribe({
            next: hospitals => {

                   setTimeout(() => {

                        this.loading = false;
                        this.hospitals = hospitals;
                        this.dataSource = new MatTableDataSource(hospitals);
                        this.dataSource.paginator = this.paginator;
                          console.log(this.dataSource)

                    },2000)

            },
            error: error => {
              console.log(error)
            }
          })
  }



}
