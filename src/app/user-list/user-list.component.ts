import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ErrorMessage } from '../error/error-message';
import { UserService } from '../service/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  isAdmin: boolean;

  errorMessage: ErrorMessage = new ErrorMessage();

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenStorage.isCurrentUserAdmin();

    this.userService.findAll().subscribe(
      (users: User[]) => this.users = users,
      (error: HttpErrorResponse) => this.checkError(error)
    );
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
