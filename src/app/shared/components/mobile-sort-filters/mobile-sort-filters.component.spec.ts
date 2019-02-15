import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TranslateTestModule } from '../../../tests';

import { MobileSortFiltersComponent } from './mobile-sort-filters.component';
import { SortDirection } from '../../enums';

describe('MobileSortFiltersComponent', () => {
  let component: MobileSortFiltersComponent;
  let fixture: ComponentFixture<MobileSortFiltersComponent>;
  let dialogRef: MatDialogRef<MobileSortFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestModule,
        MatDialogModule
      ],
      declarations: [MobileSortFiltersComponent],
      providers: [
        FormBuilder, {
          provide: MatDialogRef,
          useValue: { close: (_value) => { } }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSortFiltersComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.get(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close with provided data and set form data', () => {
    spyOn(dialogRef, 'close');

    const expected = { sortActive: 'test', sortDirection: SortDirection.ASC };

    for (const key in expected) {
      if (expected.hasOwnProperty(key)) {
        component.mobileFiltersSortForm.controls[key].patchValue(expected[key]);
      }
    }

    fixture.detectChanges();

    component.submitForm();

    expect(dialogRef.close).toHaveBeenCalledWith(expected);
    expect(component.mobileFiltersSortForm.controls.sortActive.value).toBe(expected.sortActive);
    expect(component.mobileFiltersSortForm.controls.sortDirection.value).toBe(expected.sortDirection);
  });
});
