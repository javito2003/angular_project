import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  isLoggedIn = false;
  token: string = '';
  userId: string = '';

  constructor(private router:Router) {}

  checkAuth() {    
    if (localStorage.getItem('auth')) {
      let token = JSON.parse(localStorage.getItem('auth') || '');
      if (token) {
        try {
          console.log('here');
          
          this.userId = decode(token);
          this.isLoggedIn = true;
          this.token = token;
        } catch (error) {
          this.isLoggedIn = false;
          this.token = '';
          this.userId = '';
        }
      }
    }
  }

  logOut(){
    localStorage.removeItem('auth')
    this.isLoggedIn = false
    this.token = ""
    this.userId = ""
    this.router.navigate(["login"])
  }
  
}
