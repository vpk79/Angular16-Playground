import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUSERLogin';
import { ToastrService } from 'ngx-toastr';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor(private http: HttpClient, private toastrService: ToastrService ) {
    this.userObservable = this.userSubject.asObservable();
   }

   login(userLogin: IUserLogin): Observable<User>{
     return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next:(user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to Foodmine ${user.name}!`,'Login Successful')
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
     )
   }

   logout(){
    this.userSubject.next(new User());
     if (this.isLocalStorageAvailable)
    localStorage.removeItem(USER_KEY);
    window.location.reload();
   }

   private setUserToLocalStorage(user:User){
     if (this.isLocalStorageAvailable)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
   }

   private getUserFromLocalStorage():User{
     let userJson!: any; 
     if (this.isLocalStorageAvailable){
       userJson = localStorage.getItem(USER_KEY);
     }
   
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
   }


}
