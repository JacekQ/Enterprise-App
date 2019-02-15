import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TranslateTestModule } from '../../../../../tests';

import { ContactListMobileFiltersComponent } from './contact-list-mobile-filters.component';

describe('ContactListMobileFiltersComponent', () => {
  let component: ContactListMobileFiltersComponent;
  let fixture: ComponentFixture<ContactListMobileFiltersComponent>;

  const mockDialogData = {
    filtersForm: {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestModule],
      declarations: [ContactListMobileFiltersComponent],
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
    fixture = TestBed.createComponent(ContactListMobileFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
