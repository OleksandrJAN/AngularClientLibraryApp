import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthLoginInfo } from './auth-login-info';
import { AuthSignupInfo } from './auth-signup-info';
import { JwtResponse } from './jwt-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl: string = "http://localhost:8080/auth";

  constructor(private http: HttpClient) { }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.authUrl + "/login", credentials);
  }
 
  signUp(info: AuthSignupInfo): Observable<string> {
    return this.http.post<string>(this.authUrl + "/signup", info);
  }

  logout() {
    return this.http.post(this.authUrl + "/logout", {}).subscribe();
  }


}
