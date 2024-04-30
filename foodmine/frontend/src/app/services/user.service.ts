import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/models/User';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUSERLogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(new User());
  public userObservable:Observable<User>;
  constructor(private http: HttpClient) {
    this.userObservable = this.userSubject.asObservable();
   }

   login(userLogin: IUserLogin): Observable<User>{
     return this.http.post<User>(USER_LOGIN_URL, userLogin)
   }
}
