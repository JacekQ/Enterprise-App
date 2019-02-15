import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticateData, Authenticate } from '../models';
import { environment } from '../../../../src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<AuthenticateData>;
  public currentUser: Observable<AuthenticateData>;
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthenticateData>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.apiUrl = environment.apiUrl || '';
  }

  public get currentUserValue(): AuthenticateData {
    return this.currentUserSubject.value;
  }

  login(auth: Authenticate) {
    return this.http
      .post<any>(`${this.apiUrl}/auth/login`, {
        email: auth.username,
        password: auth.password
      })
      .pipe(
        map(data => {
          // login successful if there's a jwt token in the response
          if (data.user && data.user.token) {
            const localStorageUser = {
              access_token: data.user.token,
              userId: data.user.id
            };
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(
              'currentUser',
              JSON.stringify(localStorageUser)
            );
            this.currentUserSubject.next(localStorageUser);
          }

          return data.user;
        })
      );
  }

  getUser(userId: number) {
    return this.http
      .get<any>(`${this.apiUrl}/users/${userId}`)
      .pipe(
        map(data => data)
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
