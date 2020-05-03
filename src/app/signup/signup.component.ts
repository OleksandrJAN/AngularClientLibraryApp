import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { AuthSignupInfo } from '../auth/auth-signup-info';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupInfo: AuthSignupInfo = new AuthSignupInfo();

  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
 
  constructor(private authService: AuthService) { }
 
  ngOnInit() { }

  onSubmit() {
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.isSignUpFailed = true;

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
}
