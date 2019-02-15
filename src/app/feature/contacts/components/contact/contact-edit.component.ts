import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

import * as fromRoot from '../../../../reducers';
import { contactsSelectors } from '../../store/selectors';
import * as ContactsActions from '../../store/actions/contacts.actions';
import { ContactsService } from '../../services';
import { Contact } from '../../models';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  contactForm: FormGroup;
  entity: Contact;

  private unsubscribe: Subject<void> = new Subject<void>();

  companies = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>,
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactsService
  ) {
    this.isLoading$ = this.store.pipe(select(contactsSelectors.getIsLoading));
    this.contactService.customerNames
    .pipe(
      takeUntil(this.unsubscribe)
    )
    .subscribe(data => {
      const keys = Object.keys(data);

      this.companies = _.sortBy(
        keys.map(key => {
            return { value: key, label: data[key] || 'ALL'};
          }),
          ['label']
        );
    });
  }

  ngOnInit() {
    const _entityId = this.route.snapshot.paramMap.get('id') || 0;

    if (_entityId === 0) {
      this.entity = {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyId: '',
        title: ''
      };
      this.initForm(this.entity);
      return;
    }

    this.store
      .pipe(
        takeUntil(this.unsubscribe),
        select(contactsSelectors.getContacts)
      )
      .subscribe(data => {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
          this.store.dispatch(new ContactsActions.GetContacts({}));
        } else {
          this.entity = _.find(data.contacts, ['id', +_entityId]);
          this.initForm(this.entity);
        }
      });
    }

    initForm(contact: Contact) {
      this.contactForm = this.fb.group({
        firstName: this.fb.control(contact.firstName),
        lastName: this.fb.control(contact.lastName),
        email: this.fb.control(contact.email),
        phone: this.fb.control(contact.phone),
        companyId: this.fb.control(contact.companyId.toString()),
        title: this.fb.control(contact.title),
      });
  }

  onSubmit({ value, valid }: { value: Contact, valid: boolean }) {
    if (valid) {
      if (this.entity.id > 0) {
        this.store.dispatch(new ContactsActions.SaveContact({ ...value, id: this.entity.id }));
      } else {
        this.store.dispatch(new ContactsActions.AddContact(value));
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
