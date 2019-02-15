import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../../reducers';
import * as fromAuth from '../../../auth/store/reducers';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  routeLinks: any[];
  isAdmin$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.isAdmin$ = this.store.pipe(select(fromAuth.getIsAdmin));

    this.routeLinks = [
      { path: 'list', labelKey: 'users.users.tab_label' },
      { path: 'new', labelKey: 'users.users.tab_label2' },
    ];
  }

  ngOnInit() {
  }
}
