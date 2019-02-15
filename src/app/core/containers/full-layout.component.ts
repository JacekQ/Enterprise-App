import { Component, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, startWith, delay } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as LayoutActions from '../actions/layout.actions';
import * as fromAuth from '../../auth/store/reducers';
import * as AuthActions from '../../auth/store/actions/auth.actions';
import { Link } from '../models/link';
import { User } from 'src/app/auth/models';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnDestroy, AfterViewInit {
  routeTitle: string;
  @ViewChild('sidenavContainer') sidenavContainer: MatSidenavContainer;
  showSidenav$: Observable<boolean>;
  showSidenavProfile = false;
  showProfile = false;

  routeTitleKey$: Observable<string>;
  routeTitleKey: string;
  headerActions$: Observable<Link[]>;
  user$: Observable<User>;
  isAdmin$: Observable<boolean>;
  isAdmin = false;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.user$ = this.store.pipe(select(fromAuth.getUser));
    this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
    this.routeTitleKey$ = this.store.pipe(select(fromRoot.getRouteTitleKey));
    this.headerActions$ = this.store.pipe(
      delay(0),
      select(fromRoot.getHeaderActions)
    );
    this.isAdmin$ = this.store.pipe(select(fromAuth.getIsAdmin));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngAfterViewInit() {
    this.sidenavContainer.scrollable.elementScrolled().pipe(
      debounceTime(100),
      takeUntil(this.unsubscribe)
    ).subscribe((event: any) => {
      this.store.dispatch(new LayoutActions.ScrollChange(event.target.scrollTop));
    });
  }

  closeSidenav() {
    this.store.dispatch(new LayoutActions.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new LayoutActions.OpenSidenav());
  }

  logout() {
    this.store.dispatch(new LayoutActions.CloseSidenav());
    this.store.dispatch(new AuthActions.Logout());
  }
}
