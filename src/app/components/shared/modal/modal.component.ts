import { FileUploadService } from '../../../services/file-upload.service';
import { User } from '../../../models/user.model';
import Swal from 'sweetalert2';
import { ModalService } from '../../../services/modal.service';
import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { ViewChild, ElementRef } from '@angular/core';
import { Medical } from '../../../models/medical.model';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  constructor( private fileUpload:FileUploadService, private modalSerivice: ModalService, private hospitalService: HospitalService ) {}
  @Input() title: string = '';
  @Input() body: string = '';
  @Input() user!: User | null;
  @Input() hospital!: Hospital | null;
  @Input() medical!: Medical | null;
  @Input() action!: 'input' | 'file' | 'confirmation';
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();
  @ViewChild('inputName') inputName!: ElementRef;
  public file!:File;
  public imgTemp: any ;

  ngOnInit(): void {
    console.log('Modal init');
    console.log(this.action);

  }

  closeMe() {
    this.closeMeEvent.emit();
  }
  confirm() {
    this.confirmEvent.emit();
  }

  changeFile( event:any ){
    
    if(!event.target.files[0]){
      return;
    }
  
    const reader = new FileReader();
    this.file = event.target.files[0];
    const url64 = reader.readAsDataURL( this.file );
  
    reader.onloadend = () => {

      this.imgTemp = reader.result;
      
    }

  }

  addHospital( name: string ){

    console.log(name)
  
    if(name != ''){

      this.hospitalService.createHospital(name)
                .subscribe({
                  next: ( hospital: Hospital ) => {
                    console.log(hospital)
                  },
                  error: error => {
                    console.error(error);
                    
                  }
                })


    }else{
      return;
    }
    this.confirmEvent.emit();

  }

  uploadFile( option: 'users' | 'hospitals' | 'medicals' ){
    if( this.file ){
      console.log(this.user?.uid!)
      this.fileUpload.updateImg( this.file,option, ( this.hospital !== null ? this.hospital?._id! : this.user?.uid ) )
      .subscribe({
                next: (resp: User | Hospital ) => {
                  if(resp.hasOwnProperty('isGoogle')) this.user!.img = resp.img;
                  console.log(resp );
                  this.modalSerivice.newImage.emit( resp.img )
                  
                },
                error: err => {
                  console.log(err);
                  Swal.fire('Error',err.msg,'error');
                  
                }
              })
    }else{
             console.log('upload img')

              Swal.fire('Error','File not exist','error');


    }

    this.confirmEvent.emit();

  }
  ngOnDestroy(): void {
    console.log(' Modal destroyed');
  }
}
