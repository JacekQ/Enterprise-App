import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { map, take, tap, switchMap, catchError, filter, takeUntil } from 'rxjs/operators';
import * as AuthActions from '../store/actions/auth.actions';
import * as fromAuth from '../store/reducers';
import { AuthenticationService } from './authentication.service';
import { AuthenticateData } from '../models';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>,
    private authenticationService: AuthenticationService,
    private router: Router
    ) { }

  waitForUser(): Observable<any> {
    return this.store.pipe(
      select(fromAuth.getAuthStatus),
      tap(authState => {
        if (!authState.user) {
          const currentUser: AuthenticateData = this.authenticationService.currentUserValue;
          this.store.dispatch(new AuthActions.GetUser(currentUser.userId));
        }
      }),
      filter(authState => authState.user || authState.error),
      map(authState => {
        if (authState.error) {
          throw new Error(authState.error);
        }
        return authState;
      }),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.waitForUser()
      .pipe(
        switchMap(result => {
          return of(true);
        }),
        catchError(error => {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return of(false);
        })
      );
  }
}
