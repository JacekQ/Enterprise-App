import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import {
    ContactsActionTypes,
    GetContacts,
    GetContactsFailure,
    GetContactsSuccess
} from '../actions/contacts.actions';
import { ContactsService } from '../../services';

@Injectable()
export class ContactsEffects {
    @Effect()
    getContacts$ = this.actions$.pipe(
      ofType<GetContacts>(ContactsActionTypes.GetContacts),
      map(action => action.payload),
      exhaustMap(payload => this.contactsService
        .getContacts(payload.params)
        .pipe(
          map(response => {
            return new GetContactsSuccess({
              data: response.body,
              length: response.headers.get('X-Total-Count') || response.body.length
            });
          }),
          catchError(error => of(new GetContactsFailure(error)))
        ))
    );

  @Effect({ dispatch: false })
    saveContact$ = this.actions$.pipe(
      ofType<GetContacts>(ContactsActionTypes.SaveContact),
      map(action => action.payload),
      exhaustMap(payload => this.contactsService
        .saveContact(payload)
        .pipe(
          map(response => {
            this.router.navigate(['/contacts']);
          }),
          catchError(error => of(new GetContactsFailure(error)))
        ))
    );

  @Effect({ dispatch: false })
    addContact$ = this.actions$.pipe(
      ofType<GetContacts>(ContactsActionTypes.AddContact),
      map(action => action.payload),
      exhaustMap(payload => this.contactsService
        .addContact(payload)
        .pipe(
          map(response => {
            this.router.navigate(['/contacts']);
          }),
          catchError(error => of(new GetContactsFailure(error)))
        ))
    );

  @Effect({ dispatch: false })
    deleteContact$ = this.actions$.pipe(
      ofType<GetContacts>(ContactsActionTypes.DeleteContact),
      map(action => action.payload),
      exhaustMap(payload => this.contactsService
        .deleteContact(payload)
        .pipe(
          map(response => {
            // console.log(22222222, response.body, response.headers );
          }),
          catchError(error => of(new GetContactsFailure(error)))
        ))
    );

    constructor(
      private actions$: Actions,
      private contactsService: ContactsService,
      private router: Router
    ) { }
}
