import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromAuth from '../store/reducers';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>,
  private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.getLoggedIn),
      map(authed => {
        if (authed) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}
