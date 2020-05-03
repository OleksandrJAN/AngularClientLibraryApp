import { Component, OnInit } from '@angular/core';

import { AuthLoginInfo } from '../auth/auth-login-info';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentUser: User;
  loginInfo: AuthLoginInfo = new AuthLoginInfo();

  isLoggedIn = false;
  isLoginFailed = false;

  errorMessage = '';
  username: string;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.tokenStorage.getCurrentUser().subscribe(
      (user: User) => {
        this.currentUser = user;
        this.isLoggedIn = true; 
      },
      error =>  this.isLoggedIn = false
    );
  }


  onSubmit() {
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveUserInfo(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        window.location.reload();
      },
      error => {
        console.log(error);
        this.isLoginFailed = true;
        
        if (error.error) {
          if (error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = error.error;
          }
        }
      }
    );
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
