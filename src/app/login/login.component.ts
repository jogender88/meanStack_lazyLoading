import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { GetpostService } from '../services/getpost.service';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authentication: AuthenticationService, private apiService: GetpostService, private routes: Router, ) { }
  userData;

  ngOnInit() {
    this.counter();
    this.check();
  }

  mode = 'Login';
  msg = " ";
  message = "Not Registered Click here to";
  modemsg = 'Signup';
  submitted = false;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  get l() { return this.loginForm.controls; }
  check() {
    var result = this.authentication.isLoggedIn();
    if (result == true) {
      this.routes.navigate(['home/user'])
    }
    else {
      console.log("invalid")
    }

  }
  login(user) {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    else if (this.loginForm.valid) {
      if (user.username.trim() == '' || user.password.trim() == '') {
        this.loginForm.controls['username'].setErrors({ required: true });
        this.loginForm.controls['password'].setErrors({ required: true });
      }
      else {
        if (this.mode == 'Login') {
          this.apiService.login(user)
            .subscribe(data => {
              console.log(data);
              this.userData = data
              if (this.userData.statusCode == 200) {
                localStorage.setItem('token', this.userData.token)
                this.check()
              }
              else {
                this.modemsg = 'Signup'
                this.message = "Not Registered click here to";
                this.msg = this.userData.errorMsg
              }
            }, error => {
              console.log(error)
            })
        }
        else {
          this.apiService.signup(user)
            .subscribe(data => {
              console.log(data);
              this.userData = data
              if (this.userData.statusCode == 200) {
                localStorage.setItem('token', this.userData.token)
                this.check()
              }
              else {
                this.msg = this.userData.errorMsg
              }
            }, error => {
              console.log(error)
            })
        }
      }
    }
  }
  changeToLogin() {
    if (this.mode == 'Signup') {
      this.mode = 'Login'
      this.modemsg = 'Signup'
      this.message = "Not Registered Click here to";
    }
    else {
      this.mode = 'Signup'
      this.message = "Already have an account";
      this.modemsg = 'Login';
    }
  }


  num: number = 0;
  newNum: number;
  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
  };
  interval: any;
  currentView: string;


  counter() {
    this.newNum = 3000;
    this.num = this.newNum;
    const that = this;
    this.interval = setInterval(()=> {
      that.newNum += 1;
      that.option = {
        startVal: that.num,
        useEasing: false,
        duration: 160,};
        
      that.num = this.newNum;
    }, 500000)
  }

}
