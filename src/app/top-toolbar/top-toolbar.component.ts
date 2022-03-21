import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../services/authentication-service.service';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit {

  loggedUser: boolean = false;
  constructor(private router: Router, private service: AuthenticationServiceService) { }

  ngOnInit(): void {
    this.testLogin();
  }

  redirectLogin(){
    this.router.navigate(['login']);
  }

  redirectRegister(){
    this.router.navigate(['register']);
  }
  logOut(){
    localStorage.setItem('loggedInUser', 'false');
    this.service.setData(false);
    this.router.navigate(['login']);
  }

  navigateToUrl(link: String){
    this.router.navigate([link]);
  }

  testLogin(){
    this.service.currentData.subscribe(data => {
      console.log('Value of Logged In User', data);
      this.loggedUser=data;
      if(localStorage.getItem('loggedInUser') == 'true'){
        this.loggedUser= true;
      }
    });

  }

}
