import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TranslateTestModule } from '../../../../../tests';

import { CustomerListMobileFiltersComponent } from './customer-list-mobile-filters.component';

describe('CustomerListMobileFiltersComponent', () => {
  let component: CustomerListMobileFiltersComponent;
  let fixture: ComponentFixture<CustomerListMobileFiltersComponent>;

  const mockDialogData = {
    filtersForm: {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestModule],
      declarations: [CustomerListMobileFiltersComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {}
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockDialogData
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListMobileFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
