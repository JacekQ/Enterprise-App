import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

// import * as fromAuth from '../../auth/store/reducers';
// import { User } from '../../auth/models/user';
// import { UserRoles } from '../../auth/enums';

@Component({
  selector: 'app-page-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>404: Not Found</mat-card-title>
      <mat-card-content>
        <p>{{'common.not_found.info' | translate}}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="homeRoute">{{'common.not_found.home_button' | translate}}</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
    :host {
      text-align: center;
    }
  `,
  ],
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  homeRoute = '/customers';

  // private getUser$: Observable<User>;
  // private getUserSub: Subscription = null;

  // constructor(private store: Store<fromAuth.State>) {
  //   this.getUser$ = this.store.pipe(select(fromAuth.getUser));
  // }

  ngOnInit() {
    // this.getUserSub = this.getUser$.pipe(
    //   filter(user => !!user)
    // )
    //   .subscribe(user => {
    //     if (user.userRoles.filter(uRole => uRole.name === UserRoles.ROLE_BACK_OFFICE).length > 0) {
    //       this.homeRoute = '/back-office';
    //     } else {
    //       this.homeRoute = '/';
    //     }
    //   });
  }

  ngOnDestroy() {
    // if (this.getUserSub) { this.getUserSub.unsubscribe(); }
  }
}
