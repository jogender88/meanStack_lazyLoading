import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  helper=new JwtHelperService();
  isLoggedIn():boolean{
    let token=localStorage.getItem('token')
    const isExpired = this.helper.isTokenExpired(token);
      if(!isExpired){
      return true;
    }
    else{
      return false;
    }
  }
  logout(){
    localStorage.removeItem('token')
    
  }
  // isLoggedIn(){
  //   if (localStorage.getItem('token')) {
  //     return true;
  //   }
  //   return false;
  // }
}
