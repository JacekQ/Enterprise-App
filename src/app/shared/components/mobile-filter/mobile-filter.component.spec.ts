import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TranslateTestModule } from '../../../tests';

import { MobileFilterComponent } from './mobile-filter.component';

describe('MobileFilterComponent', () => {
  let component: MobileFilterComponent;
  let fixture: ComponentFixture<MobileFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestModule,
        MatDialogModule
      ],
      declarations: [MobileFilterComponent],
      providers: [{ provide: MatDialogRef, useValue: { close: (_value) => { } } }, { provide: MAT_DIALOG_DATA, useValue: {} }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
