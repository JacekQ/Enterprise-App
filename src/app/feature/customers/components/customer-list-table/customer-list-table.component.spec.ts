import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatSortModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { TranslateTestModule } from '../../../../../tests';

import { CustomerListTableComponent } from './customer-list-table.component';
import { SharedModule } from '../../../../shared';
import * as fromCustomers from '../../store/reducers/customers.reducer';

describe('CustomerListTableComponent', () => {
  let component: CustomerListTableComponent;
  let fixture: ComponentFixture<CustomerListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        TranslateTestModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('customers', fromCustomers.reducer)
      ],
      declarations: [CustomerListTableComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
