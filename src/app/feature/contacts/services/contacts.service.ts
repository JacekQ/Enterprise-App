import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Contact } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  apiUrl: string;

  private dataSource = new BehaviorSubject<any>({});
  public customerNames = this.dataSource.asObservable();

  constructor(private http: HttpClient,
   private fb: FormBuilder
  ) {
    this.apiUrl = environment.apiUrl || '';
    this.http.get<any>(`${this.apiUrl}/customers?_sort=companyName&_order=asc`)
      .subscribe(data => {
        const all = {};
        data.forEach(item => all[item.id] = item.companyName);
        this.dataSource.next(all);
      });
  }

  getContacts(queryParams: any): Observable<any> {
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

    return this.http.get<any>(`${this.apiUrl}/contacts`, { params, withCredentials: true, observe: 'response' });
  }

  saveContact(contact: Contact): Observable<any> {
    const contactId = contact.id;
    return this.http.put<any>(`${this.apiUrl}/contacts/${contactId}`, contact);
  }

  addContact(contact: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contacts`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/contacts/${id}`);
  }

  getContactContacts(id): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('companyId', id);

    return this.http.get<any>(`${this.apiUrl}/contacts`, { params, withCredentials: true, observe: 'response' });
  }

  getContactListFiltersForm(): FormGroup {
    return this.fb.group({
      filters: this.fb.group({
        search: this.fb.control(''),
        company: this.fb.control(''),
      })
    });
  }
}
