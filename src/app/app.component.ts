import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from './model/token';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(public auth: AuthService, private route: Router){

  }
  // tslint:disable-next-line:typedef
  ngOnInit(){
    this.loadCurrentUser();

  }
  loadCurrentUser(): void  {
    const token = {} as Token;
    token.accessToken  = localStorage.getItem('accessToken');
    token.refreshToken  = localStorage.getItem('refreshToken');

    if (token.accessToken && token.refreshToken &&
      !this.auth.jwtHelper.isTokenExpired(token.accessToken)) {
      this.auth.loadCurrentUser(token);
    }
    else{
      this.auth.logOut();
      this.route.navigate(['/shop/login']);
    }
  }
}
