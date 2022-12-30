import { Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/components.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  menuItem: MenuItem[] = [
    {
     title: 'Mantein',
     icon: 'supervisor_account',
     submenu: [
      { title: 'Users', url: 'users'},
      { title: 'Hospitals', url: 'hospitals'},
      { title: 'Medicals', url: 'medicals'},
     ]  
    },
    {
      title: 'Profile User',
      icon: 'person_pin',
      submenu: [
        {
          title: 'Perfil',
          url: 'profile'
        }
      ]
    }
  ]

  constructor() { }

  get menu(){
    return this.menuItem
  }


}
