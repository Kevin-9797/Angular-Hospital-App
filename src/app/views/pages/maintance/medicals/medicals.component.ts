import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MedicalService } from '../../../../services/medical.service';
import { Medical } from '../../../../models/medical.model';
import { ColumnsTable } from '../../interfaces/components.interface';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-medicals',
  templateUrl: './medicals.component.html',
  styleUrls: ['./medicals.component.css']
})
export class MedicalsComponent implements OnInit {
  @ViewChild('modal', { read: ViewContainerRef }) 
  entry!: ViewContainerRef;
  sub!: Subscription;

  public hospitals: Medical[] = [] ;
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

  constructor( private medicalService: MedicalService , public modalService: ModalService) { }

  ngOnInit(): void {
  }

  addMedical(){

  }
  openModal( medical:Medical ) {
    this.sub = this.modalService
      .openModal(this.entry, `Are you sure you want to delete the hospital ${ medical.name } ?`, 'Please , click confirm or close', 'confirmation' )
      .subscribe(( resp:any) => {
        console.log(resp)

        if( resp === 'confirm'){
          this.medicalService.createMedical(medical)

        } else{
          return;
        }
      });
  }


  openModalUploadImg( medical: Medical ){

    this.sub = this.modalService
    .openModal(this.entry, `If you want to change the profile picture of hospital ${ medical.name }`, 'Please click on the icon below', 'file', null,null,medical)
    .subscribe(( resp:any) => {
        
    })

  }
  
  updateMedical( medical: Medical ){


  }

}
