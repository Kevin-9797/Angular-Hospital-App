import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { DrawerComponent } from './drawer/drawer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './pages/maintance/users/users.component';
import { ComponentsModule } from '../components/components.module';
@NgModule({
  declarations: [
    DashboardComponent,
    DrawerComponent,
    ProfileComponent,
    UsersComponent
  ],
  exports: [
    DashboardComponent,
    DrawerComponent,
    ProfileComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
  ]
  
})
export class ViewsModule { }
