import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { CustomDateFilterService } from '../../../shared';
import { Customer } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  apiUrl: string;

  constructor(private http: HttpClient,
   private fb: FormBuilder,
   private cdfService: CustomDateFilterService
  ) {
    this.apiUrl = environment.apiUrl || '';
  }

  getCustomers(queryParams: any): Observable<any> {
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

    return this.http.get<any>(`${this.apiUrl}/customers`, { params, withCredentials: true, observe: 'response' });
  }

  saveCustomer(customer: Customer): Observable<any> {
    const customerId = customer.id;
    return this.http.put<any>(`${this.apiUrl}/customers/${customerId}`, customer);
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/customers`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/customers/${id}`);
  }

  getCustomerContacts(id): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('companyId', id);

    return this.http.get<any>(`${this.apiUrl}/contacts`, { params, withCredentials: true, observe: 'response' });
  }

  getCustomerListFiltersForm(): FormGroup {
    return this.fb.group({
      filters: this.fb.group({
        search: this.fb.control(''),
        country: this.fb.control(''),
      }),
      dateFilter: this.fb.control(''),
      dates: this.cdfService.getCustomDateFilterForm()
    });
  }
}
