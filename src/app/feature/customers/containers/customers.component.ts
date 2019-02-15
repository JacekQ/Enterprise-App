import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromRoot from '../../../reducers';
import * as fromAuth from '../../..//auth/store/reducers';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  routeLinks: any[];
  isAdmin$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.isAdmin$ = this.store.pipe(select(fromAuth.getIsAdmin));
    this.routeLinks = [
      { path: 'list', labelKey: 'customers.customers.tab_label' },
      { path: 'new', labelKey: 'customers.customers.tab_label2' },
    ];
  }

  ngOnInit() {
  }

}
