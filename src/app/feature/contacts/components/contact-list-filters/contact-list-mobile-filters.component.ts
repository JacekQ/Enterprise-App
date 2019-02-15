import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-contact-list-mobile-filters',
  templateUrl: './contact-list-mobile-filters.component.html',
  styleUrls: ['./contact-list-mobile-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListMobileFiltersComponent {

  mobileFiltersForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ContactListMobileFiltersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onSubmitFilters(): void {
    this.dialogRef.close({ ...this.data.filtersForm.value });
  }
}
