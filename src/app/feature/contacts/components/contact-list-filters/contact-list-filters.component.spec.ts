import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TranslateTestModule } from '../../../../../tests';

import { ContactListFiltersComponent } from './contact-list-filters.component';

describe('ContactListFiltersComponent', () => {
  let component: ContactListFiltersComponent;
  let fixture: ComponentFixture<ContactListFiltersComponent>;
  let fb: FormBuilder;
  let filtersFormMock: FormGroup;

  const filtersOptionsMock = {
    search: '',
    country: [],
    created: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestModule],
      providers: [FormBuilder],
      declarations: [ContactListFiltersComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fb = TestBed.get(FormBuilder);
    filtersFormMock = fb.group({
      filters: fb.group({
        search: fb.control(''),
        country: fb.control(''),
      }),
      dateFilter: fb.control(''),
      dates: fb.group({
        fromDate: fb.control(''),
        fromTime: fb.control(''),
        doDate: fb.control(''),
        toTime: fb.control('')
      })

    });
    fixture = TestBed.createComponent(ContactListFiltersComponent);
    component = fixture.componentInstance;
    component.form = filtersFormMock;
    component.filterOptions = filtersOptionsMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
