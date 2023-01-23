import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private userService:UserService, private router:Router ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      
    return this.userService.tokenValidate()
    .pipe(
      tap( (isAuth:any) => {
        if(!isAuth){
          this.router.navigateByUrl('auth/login')
          return false;
        }else{
          return true;
        }
      })
    );
  }
  
}
