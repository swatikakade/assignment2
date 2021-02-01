import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`http://localhost:3000/users/authenticate`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.userSubject.next(null);
    }

    register(user: User) {
        return this.http.post(`http://localhost:3000/users`, user);
    }

    isAuthorized(){
        var currentUser = sessionStorage.getItem("currentUser")?JSON.parse(sessionStorage.getItem("currentUser")):null;
        if(currentUser){
        return true;
        }else{
        return false;
        }
    }

    getAll() {
        return this.http.get<User[]>(`http://localhost:3000/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`http://localhost:3000/users/${id}`);
    }

    getUserByEmail(email: string) {
        return this.http.get<User>(`http://localhost:3000/users?email=${email}`);
    }

    update(id, params) {
        return this.http.put(`http://localhost:3000/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`http://localhost:3000/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}
