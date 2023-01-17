import { Injectable,ComponentRef,ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from '../components/shared/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private componentRef!: ComponentRef<ModalComponent>;
  private componentSubscriber!: Subject<string>;
  constructor() {}

  openModal(entry: ViewContainerRef, modalTitle: string, modalBody: string) {
    this.componentRef = entry.createComponent(ModalComponent) ;
    this.componentRef.instance.title = modalTitle ;
    this.componentRef.instance.body = modalBody ;
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
