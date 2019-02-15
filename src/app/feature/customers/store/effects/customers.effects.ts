import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import {
    CustomersActionTypes,
    GetCustomers,
    GetCustomersFailure,
    GetCustomersSuccess,
    ReloadCustomers
} from '../actions/customers.actions';
import { CustomersService } from '../../services';

@Injectable()
export class CustomersEffects {
  @Effect()
    getCustomers$ = this.actions$.pipe(
        ofType<GetCustomers>(CustomersActionTypes.GetCustomers),
        map(action => action.payload),
        exhaustMap(payload => {
          return this.customersService
            .getCustomers(payload.params)
            .pipe(
              map(response => new GetCustomersSuccess({
                  data: response.body,
                  length: response.headers.get('X-Total-Count') || response.body.length
                })),
              catchError(error => of(new GetCustomersFailure(error)))
          );
        })
    );

  @Effect({dispatch: false})
    saveCustomer$ = this.actions$.pipe(
        ofType<GetCustomers>(CustomersActionTypes.SaveCustomer),
        map(action => action.payload),
        exhaustMap(payload => this.customersService
          .saveCustomer(payload)
          .pipe(
              map(response => {
                this.router.navigate(['/customers']);
              }),
              catchError(error => of(new GetCustomersFailure(error)))
          ))
    );

  @Effect({dispatch: false})
    addCustomer$ = this.actions$.pipe(
        ofType<GetCustomers>(CustomersActionTypes.AddCustomer),
        map(action => action.payload),
        exhaustMap(payload => this.customersService
          .addCustomer(payload)
          .pipe(
              map(response => {
                this.router.navigate(['/customers']);
              }),
              catchError(error => of(new GetCustomersFailure(error)))
          ))
    );

  @Effect({dispatch: false})
    deleteCustomer$ = this.actions$.pipe(
        ofType<GetCustomers>(CustomersActionTypes.DeleteCustomer),
        map(action => action.payload),
        exhaustMap(payload => this.customersService
          .deleteCustomer(payload)
          .pipe(
              map(response => {
                // console.log(22222222, response.body, response.headers);
              }),
              catchError(error => of(new GetCustomersFailure(error)))
          ))
    );

    constructor(
        private actions$: Actions,
        private customersService: CustomersService,
        private router: Router
    ) { }
}
