import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, Role } from '../model/user';
import { Review } from '../model/review';
import { UpdatePasswordDto } from '../user-settings/update-password-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl: string = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }


  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  public findOne(id: number): Observable<User> {
    return this.http.get<User>(this.userUrl + "/" + id);
  }

  public findUserReviews(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.userUrl + "/" + id + "/reviews");
  }

  public delete(user: User): any {
    return this.http.delete(this.userUrl + "/" + user.id);
  }


  // PROFILE 
  
  public updateUserPassword(user: User, passwordDto: UpdatePasswordDto): any {
    return this.http.put(this.userUrl + "/" + user.id + "/settings/password", passwordDto);
  }

  public updateUserRole(user: User): Observable<Role[]> {
    return this.http.put<Role[]>(this.userUrl + "/" + user.id + "/settings/role", user.roles);
  }
}
