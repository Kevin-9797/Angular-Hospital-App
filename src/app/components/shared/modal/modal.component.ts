import { FileUploadService } from '../../../services/file-upload.service';
import { User } from '../../../models/user.model';
import Swal from 'sweetalert2';
import { ModalService } from '../../../services/modal.service';
import { Hospital } from '../../../models/hospital.model';
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
  constructor( private fileUpload:FileUploadService, private modalSerivice: ModalService) {}
  @Input() title: string = '';
  @Input() body: string = '';
  @Input() user!: User;
  @Input() hospital!: Hospital;
  @Input() activateUpload: boolean = false;
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();
  public file!:File;
  public imgTemp: any ;

  ngOnInit(): void {
    console.log('Modal init');
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

  uploadFile(){
    if( this.file ){
      console.log(this.user.uid!)
      this.fileUpload.updateImg( this.file,'users', this.user.uid! )
      .subscribe({
                next: user => {
                  this.user.img = user.img;
                  console.log(user + ' Esta es la img');
                  this.modalSerivice.newImage.emit(user.img)
                  
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
