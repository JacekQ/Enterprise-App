import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-list-mobile-filters',
  templateUrl: './user-list-mobile-filters.component.html',
  styleUrls: ['./user-list-mobile-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListMobileFiltersComponent {

  mobileFiltersForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<UserListMobileFiltersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onSubmitFilters(): void {
    this.dialogRef.close({ ...this.data.filtersForm.value });
  }
}
