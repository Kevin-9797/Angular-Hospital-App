import { Component, OnInit, ViewContainerRef, ViewChild, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../../services/hospital.service';
import { Hospital } from '../../../../models/hospital.model';
import { ModalService } from '../../../../services/modal.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit, OnDestroy {
  @ViewChild( 'paginator' ) paginator!: MatPaginator;

  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

  public hospitals:Hospital[] = [] ;
  public imagePath: string = 'assets/images/avatar_image.jpg';
  public dataSource!: any;
  public loading: boolean = true ; 
  public pageSizeOptions = [5, 10, 25, 50];
  public pageSize: number = 5;
  public displayedColumns: [] = [];
  public columnNames: any = [
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
              
    ) { }

    openModal( hospital:Hospital ) {
      this.sub = this.modalService
        .openModal(this.entry, `Are you sure you want to delete the hospital ${ hospital.name } ?`, 'Please , click confirm or close', false )
        .subscribe(( resp:any) => {
          console.log(resp)
          if( resp === 'confirm'){
          
          } else{
            return;
          }
        });
    }
    ngOnDestroy(): void {
      if (this.sub) this.sub.unsubscribe();
    }

  ngOnInit(): void {
    this.loadHospitals();
  }

  openModalUploadImg( hospital: Hospital ){

    this.sub = this.modalService
    .openModal(this.entry, `If you want to change the profile picture of user ${ hospital.name }`, 'Please click on the icon below', true, null,hospital)
    .subscribe(( resp:any) => {

    })

  }


  loadHospitals(){
    this.loading = true ;

    this.hospitalService.loadHospitals(0)
          .subscribe({
            next: hospitals => {
              this.loading = false;
              this.hospitals = hospitals;
              console.log(hospitals)
              this.dataSource = new MatTableDataSource(hospitals);
              this.dataSource.paginator = this.paginator;

            },
            error: error => {

            }
          })
  }



}
