import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authentication:AuthenticationService,private router:Router) { }

  ngOnInit() {
  }
  logout(){
    this.authentication.logout();
    this.router.navigate(['login']);
  }
  
}
