import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import {
  AuthActionTypes,
  Login,
  LoginSuccess,
  LoginFailure,
  HomeRedirect,
  LoginRedirect,
  ReloadPage,
  GetUser,
  GetUserSuccess
} from '../actions/auth.actions';
import { AuthenticationService } from '../../services/authentication.service';
import { UserRoles } from '../../enums';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap(payload => {
      return this.authService.login(payload).pipe(
        map(user => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
          this.router.navigate([returnUrl]);
          return new LoginSuccess(user);
        }),
        catchError(error => of(new LoginFailure(error)))
      );
    })
  );

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType<GetUser>(AuthActionTypes.GetUser),
    map(action => action.payload),
    exhaustMap(payload =>
      this.authService
        .getUser(payload).pipe(
          map(user => new GetUserSuccess(user)),
          catchError(error => of(new LoginFailure(error)))
        )
    )
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    map(() => {
        this.authService.logout();
        this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
    })
  );

  @Effect({ dispatch: false })
  reloadPage$ = this.actions$.pipe(
    ofType(AuthActionTypes.ReloadPage),
    tap(() => {
      window.location.reload();
    })
  );

  @Effect({ dispatch: false })
  homeRedirect$ = this.actions$.pipe(
    ofType<HomeRedirect>(AuthActionTypes.HomeRedirect),
    map(action => {
      let route = '';
      if (action.payload.userRoles.map(uRole => uRole.name).indexOf(UserRoles.ROLE_USER) > -1) {
        route = '/customers';
      } else {
        route = '/';
      }

      this.router.navigate([route]);
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
