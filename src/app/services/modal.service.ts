import { Injectable,ComponentRef,ViewContainerRef, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from '../components/shared/modal/modal.component';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private componentRef!: ComponentRef<ModalComponent>;
  private componentSubscriber!: Subject<string>;
  public newImage: EventEmitter<string> = new EventEmitter<string>()
  constructor() {}

  openModal(entry: ViewContainerRef, modalTitle: string, modalBody: string, activateUpload: boolean, user?: User | null ,hospital?:Hospital  ) {
    this.componentRef = entry.createComponent(ModalComponent) ;
    this.componentRef.instance.title = modalTitle ;
    this.componentRef.instance.body = modalBody ;
    this.componentRef.instance.activateUpload = activateUpload ;
    
    if(user && user !== null) this.componentRef.instance.user = user  ;
    if(hospital && hospital !== null) this.componentRef.instance.hospital = hospital  ;


    this.componentRef.instance.closeMeEvent.subscribe( () => this.closeModal() );
    this.componentRef.instance.confirmEvent.subscribe( () => this.confirm() );
    this.componentSubscriber = new Subject<string>();
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm() {
    this.componentSubscriber.next('confirm');
    this.closeModal();
  }
}
