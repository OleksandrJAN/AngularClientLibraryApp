import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { TokenStorageService } from '../auth/token-storage.service';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { Review } from '../model/review';
import { ErrorMessage } from '../error/error-message';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  currentUser: User = new User();
  isCurrentUserAdmin: boolean;

  userProfile: User = new User();
  reviews: Review[];
  
  errorMessage: ErrorMessage = new ErrorMessage();
  
  private subscription: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.getCurrentUserInfo();

    let id: number;
    this.subscription = this.route.params.subscribe(params => id = params['id']);

    this.userService.findOne(id).subscribe(
      (user: User) => {
        this.userProfile = user;
        this.findUserReviews(id);
      },
      (error: HttpErrorResponse) => this.checkError(error)
    );
  }

  getCurrentUserInfo() {
    this.tokenStorage.getCurrentUser().subscribe(
      (user: User) => this.currentUser = user,
      (error: HttpErrorResponse) => this.checkError(error)
    );
    this.isCurrentUserAdmin = this.tokenStorage.isCurrentUserAdmin();
  }

  findUserReviews(id: number) {
    this.userService.findUserReviews(id).subscribe(
      (reviews: Review[]) => this.reviews = reviews,
      (error: HttpErrorResponse) => this.checkError(error)
    )
  }

  checkError(error: HttpErrorResponse) {
    console.log(error);
    this.errorMessage.status = error.status;
    
    if (error.error) {
      if (error.error.message) {
        this.errorMessage.message = error.error.message;
      } else {
        this.errorMessage.message = error.error;
      }
    }
  }

}
