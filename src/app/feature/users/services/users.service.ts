import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl: string;

  constructor(private http: HttpClient,
   private fb: FormBuilder
  ) {
    this.apiUrl = environment.apiUrl || '';
  }

  getUsers(queryParams: any): Observable<any> {
    let params: HttpParams = new HttpParams();

    for (const param in queryParams) {
      if (queryParams.hasOwnProperty(param)) {
        if (queryParams[param] instanceof Array) {
          queryParams[param].forEach(par => params = params.append(param, par));
        } else {
          params = params.append(param, queryParams[param]);
        }
      }
    }

    return this.http.get<any>(`${this.apiUrl}/users`, { params, withCredentials: true, observe: 'response' });
  }

  getUser(userId): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }

  saveUser(user: User): Observable<any> {
    const userId = user.id;
    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, user);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`);
  }
  getUserListFiltersForm(): FormGroup {
    return this.fb.group({
      filters: this.fb.group({
        search: this.fb.control('')
      })
    });
  }
}
