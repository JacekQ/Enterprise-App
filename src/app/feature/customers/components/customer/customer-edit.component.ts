import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

import * as fromRoot from '../../../../reducers';
import { customersSelectors } from '../../store/selectors';
import * as CustomersActions from '../../store/actions/customers.actions';
import { CustomersService } from '../../services';
import { Customer } from '../../models';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  customerForm: FormGroup;
  entity: Customer;

  private unsubscribe: Subject<void> = new Subject<void>();

  countries = ['England', 'Poland', 'USA'];

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomersService
  ) {
    this.isLoading$ = this.store.pipe(select(customersSelectors.getIsLoading));
  }

  ngOnInit() {
    const _entityId = this.route.snapshot.paramMap.get('id') || 0;
    if (_entityId === 0) {
      this.entity = {
        id: 0,
        companyName: '',
        address: '',
        city: '',
        country: '',
        email: '',
        phone: '',
        createdAt: ''
      };
      this.initForm(this.entity);
      return;
    }

    this.store
      .pipe(
        takeUntil(this.unsubscribe),
        select(customersSelectors.getCustomers)
      )
      .subscribe(data => {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
          this.store.dispatch(new CustomersActions.GetCustomers({}));
        } else {
          this.entity = _.find(data.customers, ['id', +_entityId]);
          this.initForm(this.entity);
        }
      });
    }

    initForm(customer: Customer) {
      this.customerForm = this.fb.group({
        companyName: this.fb.control(customer.companyName),
        address: this.fb.control(customer.address),
        city: this.fb.control(customer.city),
        country: this.fb.control(customer.country),
        email: this.fb.control(customer.email),
        phone: this.fb.control(customer.phone),
        createdAt: this.fb.control(customer.createdAt),
      });
  }

  onSubmit({ value, valid }: { value: Customer, valid: boolean }) {
    if (valid) {
      if (this.entity.id > 0) {
        this.store.dispatch(new CustomersActions.SaveCustomer({ ...value, id: this.entity.id }));
      } else {
        this.store.dispatch(new CustomersActions.AddCustomer(value));
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
