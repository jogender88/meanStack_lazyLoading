import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { GetpostService } from '../services/getpost.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authentication: AuthenticationService,private apiService:GetpostService, private routes: Router, ) { }
userData;
  ngOnInit() {
  }
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required)
  })
  check(user) {
    var result = this.authentication.isLoggedIn();
    if (result == true) {
      this.routes.navigate(['home/user'])
    }
    else {
      console.log("invalid")
    }

  }
  login(user){
    this.apiService.login(user)
    .subscribe(data=>{
      console.log(data);
      this.userData=data
      localStorage.setItem('token',this.userData.token)
      this.check(user)
    })
  }
}
