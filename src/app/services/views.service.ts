import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ViewsService {
    private menuIsOpen$ : Subject<boolean>;
    private menuIsOpen: boolean = true;
    constructor() { 
        this.menuIsOpen$ = new Subject<boolean>();
    }

    /**
    * If menu is open, let close it
    **/
    public open() {
            if(!this.menuIsOpen) {
                this.menuIsOpen = true;
                this.menuIsOpen$.next(false);
            }
    }
    public silenceOpen() {
        this.menuIsOpen = true;
    }
    public silenceClose() {
        this.menuIsOpen = false;
    }

    public close() {
            if(this.menuIsOpen) {
                this.menuIsOpen = false;
                this.menuIsOpen$.next(false);
            }
    }

    public toggle() {
        this.menuIsOpen = !this.menuIsOpen;
        this.menuIsOpen$.next(this.menuIsOpen);
    }

    public asObservable() 
    {
        return this.menuIsOpen$.asObservable();
    }
}
