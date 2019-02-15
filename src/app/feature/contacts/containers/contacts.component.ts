import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../../reducers';
import * as fromAuth from '../../..//auth/store/reducers';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  routeLinks: any[];
  isAdmin$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.isAdmin$ = this.store.pipe(select(fromAuth.getIsAdmin));
    this.routeLinks = [
      { path: 'list', labelKey: 'contacts.contacts.tab_label' },
      { path: 'new', labelKey: 'contacts.contacts.tab_label2' },
    ];
  }

  ngOnInit() {
  }

}
