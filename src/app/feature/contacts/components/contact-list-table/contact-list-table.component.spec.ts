import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatSortModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { TranslateTestModule } from '../../../../../tests';

import { ContactListTableComponent } from './contact-list-table.component';
import { SharedModule } from '../../../../shared';
import * as fromContacts from '../../store/reducers/contacts.reducer';

describe('ContactListTableComponent', () => {
  let component: ContactListTableComponent;
  let fixture: ComponentFixture<ContactListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        TranslateTestModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('contacts', fromContacts.reducer)
      ],
      declarations: [ContactListTableComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
