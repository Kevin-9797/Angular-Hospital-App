import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { UsersComponent } from './pages/maintance/users/users.component';
import { HospitalsComponent } from './pages/maintance/hospitals/hospitals.component';
import { MedicalsComponent } from './pages/maintance/medicals/medicals.component';
import { MedicalProfileComponent } from './pages/maintance/medical-profile/medical-profile.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'hospitals',
        component: HospitalsComponent
      },
      {
        path: 'medicals',
        component: MedicalsComponent
      },
      {
        path: 'medical/:id',
        component: MedicalProfileComponent
      },
      {
        path:'**',
        redirectTo:'',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
