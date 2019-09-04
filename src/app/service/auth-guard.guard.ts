import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private routes:Router,private authentication:AuthenticationService,private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      if(localStorage.getItem('token')!=null){
        console.log(this.authentication.isLoggedIn())
        if(this.authentication.isLoggedIn())
        return true;
        else{
          this.routes.navigate(['/login']);
          return false;
        }
      }
      else{
        this.routes.navigate(['/login']);
        return false;
      }
  }
  
  canActivateChild(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      if(localStorage.getItem('token')!=null){
        console.log(this.authentication.isLoggedIn())
        if(this.authentication.isLoggedIn())
        return true;
        else{
          this.routes.navigate(['/login']);
          return false;
        }
      }
      else{
        this.routes.navigate(['/login']);
        return false;
      }
  }
 
  
}
