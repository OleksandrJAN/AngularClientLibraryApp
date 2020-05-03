import { Injectable } from '@angular/core';
import { User, Role } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  signOut() {
    this.authService.logout();
    window.sessionStorage.clear();
  }

  saveUserInfo(data) {
    this.saveToken(data.token);
    this.saveUsername(data.username);
    this.saveAuthorities(data.authorities);
  }


  private saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  private saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  private saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }


  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getUsername() {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public getAuthorities(): string[] {
    let roles = [];
 
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(
        authorityObject => roles.push(authorityObject.authority)
      );
    }
 
    return roles;
  }


  public isCurrentUserAdmin(): boolean { 
    return this.getAuthorities().includes("ROLE_ADMIN");
  }

  public isCurrentUserAuth(): boolean {
    return this.getAuthorities().includes("ROLE_USER");
  }


  public getCurrentUser(): Observable<User> {
    let userUrl: string = 'http://localhost:8080/users';
    let username = this.getUsername();
    if (username !== null) {
      return this.http.get<User>(userUrl + "/" + username);
    } else {
      this.signOut();
    }

    return new Observable;
    // что возвращать если нет текущего юзера
  }

  public getAllRoles(): Role[] {
    return  [Role.ROLE_USER, Role.ROLE_MODERATOR, Role.ROLE_ADMIN];
  }

}
