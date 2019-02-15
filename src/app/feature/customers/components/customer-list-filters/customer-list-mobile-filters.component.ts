import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-customer-list-mobile-filters',
  templateUrl: './customer-list-mobile-filters.component.html',
  styleUrls: ['./customer-list-mobile-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListMobileFiltersComponent {

  mobileFiltersForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CustomerListMobileFiltersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onSubmitFilters(): void {
    this.dialogRef.close({ ...this.data.filtersForm.value });
  }
}
