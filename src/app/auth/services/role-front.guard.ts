import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as AuthActions from '../store/actions/auth.actions';
import * as fromAuth from '../store/reducers';
import { User } from '../models/user';
import { UserRoles } from '../enums';

@Injectable()
export class RoleFrontGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(fromAuth.getUser),
      map((user: User) => {

        if (user && user.role) {
          if (user.role.filter(uRole => uRole.name === UserRoles.ROLE_ADMIN || uRole.name === UserRoles.ROLE_USER).length === 0) {
            this.store.dispatch(new AuthActions.HomeRedirect({ userRoles: user.role }));
            return false;
          }
          return true;
        }
        return false;
      }),
      take(1)
    );
  }
}
