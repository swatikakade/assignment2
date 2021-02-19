import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../_models/user';

import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL: string;
  userSubject:any;
  user:any;

  constructor(public http: HttpClient) {
    this.baseURL = "http://localhost:3000";
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users`);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/users/${id}`)
    .pipe(map(data => { return data; }));
  }

  createUser(model: User): Observable<User> {
    return this.http.post<User>(`${this.baseURL}/users`, model);
  }

  updateUser(id: string | number, update: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseURL}/users/${id}`, update);
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.baseURL}/users/${id}`);
  }

  getUserByEmail(email: string) {
    //return this.http.get<User>(`${this.baseURL}/users?email=${email}`)
    //.pipe(map(data => { return data; }));
    return this.http.get<User>(`${this.baseURL}/users?email=${email}`);
  }

  login(email: string, password: string) {
      return this.http.post<User>(`${this.baseURL}/login`, { email, password })
      .pipe(map(response => {
        return response;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          //console.log(data);
          // var user = {};
          // if(data != null){
          //     this.http.get(`${this.baseURL}/users?email=`+email).subscribe(data =>{
          //         if(data != null && data[0] != null) { 
          //             user = data[0];
          //             //sessionStorage.setItem('currentUser', JSON.stringify(user)); 
          //             console.log(user);
          //             return user;
          //         }
          //     });
          //     return user;
          // }
      }));
  }

  logout() {
      sessionStorage.removeItem('currentUser');
      //this.userSubject.next(null);
  }
  
  isAuthorized(){
      var currentUser = sessionStorage.getItem("currentUser")?JSON.parse(sessionStorage.getItem("currentUser")):null;
      if(currentUser){
          return true;
      }else{
          return false;
      }
  }

}
