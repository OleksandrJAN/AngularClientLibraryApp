import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { User } from './model/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // реализовать refresh_token
  // панель поиска юзеров

  currentUser: User = new User();
  isCurrentUserAuth: boolean = false;
  isCurrentUserAdmin: boolean = false;
  
  constructor(
    private tokenStorage: TokenStorageService
  ) { }


  ngOnInit(): void {
    this.getCurrentUserInfo();
  }

  getCurrentUserInfo() {
    this.tokenStorage.getCurrentUser().subscribe(
      (user: User) => {
        this.currentUser = user;
        this.isCurrentUserAuth = this.tokenStorage.isCurrentUserAuth();
        this.isCurrentUserAdmin = this.tokenStorage.isCurrentUserAdmin();   
      },
      (error: HttpErrorResponse) => this.checkError(error)
    );
     
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  checkError(error: HttpErrorResponse) {
    console.log(error);
  }
}
