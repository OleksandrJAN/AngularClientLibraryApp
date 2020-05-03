import { Component, OnInit } from '@angular/core';
import { User, Role } from '../model/user';
import { ErrorMessage } from '../error/error-message';
import { Subscription } from 'rxjs';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdatePasswordDto } from './update-password-dto';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  currentUser: User = new User();
  isCurrentUserAdmin: boolean;
  userProfile: User = new User();

  initErrorMessage: ErrorMessage = new ErrorMessage();

  passwordDto: UpdatePasswordDto = new UpdatePasswordDto();
  passwordUpdated: boolean = false;
  passwordUpdateErrorMessage: ErrorMessage = new ErrorMessage();

  roleUpdated: boolean = false;
  roleUpdateErrorMessage: ErrorMessage = new ErrorMessage();

  allRoles: Role[];

  private subscription: Subscription;


  checkRole(role: Role) {
    return this.userProfile.roles.includes(role);
  }

  changeRole(role: Role, $event) {
    if ($event.target.checked) {
      (this.userProfile.roles).push(role);
    } else {
      this.userProfile.roles.splice(this.userProfile.roles.indexOf(role), 1);
    }
  }

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.allRoles = this.tokenStorage.getAllRoles();
    this.getCurrentUserInfo();

    let id: number;
    this.subscription = this.route.params.subscribe(params => id = params['id']);

    this.userService.findOne(id).subscribe(
      (user: User) => {
        this.userProfile = user; 
        if (user.id !== this.currentUser.id && !this.isCurrentUserAdmin) {
          this.initErrorMessage = ErrorMessage.forbiddenError();
        }
      },
      (error: HttpErrorResponse) => this.checkError(error, this.initErrorMessage)
    );
  }

  getCurrentUserInfo() {
    this.tokenStorage.getCurrentUser().subscribe(
      (user: User) => this.currentUser = user,
      (error: HttpErrorResponse) => this.checkError(error, this.initErrorMessage)
    );
    this.isCurrentUserAdmin = this.tokenStorage.isCurrentUserAdmin();
  }

  deleteUser() {
    this.userService.delete(this.userProfile).subscribe(
      () => this.router.navigate(['/users']),
      (error: HttpErrorResponse) => this.checkError(error, this.initErrorMessage)
    )
  }

  onPasswordSubmit() {
    this.userService.updateUserPassword(this.currentUser, this.passwordDto).subscribe(
      () => {
        this.passwordUpdated = true

        // clear 'this.passwordDto' and 'this.passwordUpdateErrorMessage'
        this.passwordDto = new UpdatePasswordDto();
        this.passwordUpdateErrorMessage = new ErrorMessage();
      },
      (error: HttpErrorResponse) => {
        this.passwordDto = new UpdatePasswordDto();
        this.passwordUpdated = false;

        this.checkError(error, this.passwordUpdateErrorMessage);
      }
    )
  }

  onRolesSubmit() {
    this.userService.updateUserRole(this.userProfile).subscribe(
      (roles: Role[]) => {
        // need relogin
        // каким то образом сделать logout пользователя
        this.userProfile.roles = roles;
        this.roleUpdated = true;

        // clear 'this.roleUpdateErrorMessage'
        this.roleUpdateErrorMessage = new ErrorMessage();
      },
      (error: HttpErrorResponse) => {
        this.roleUpdated = false;
        this.checkError(error, this.roleUpdateErrorMessage);
      }
    )
  }


  checkError(error: HttpErrorResponse, errorMessage: ErrorMessage) {
    console.log(error);
    errorMessage.status = error.status;
    
    if (error.error) {
      if (error.error.message) {
        errorMessage.message = error.error.message;
      } else {
        errorMessage.message = error.error;
      }
    }
  }

}
