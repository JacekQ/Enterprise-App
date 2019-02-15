import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SortDirection } from '../../enums';

export const DEFAULT_SORT_DIRECTIONS = [
  { value: SortDirection.ASC, label: 'shared.sorting.sort_directions.' + SortDirection.ASC },
  { value: SortDirection.DESC, label: 'shared.sorting.sort_directions.' + SortDirection.DESC }
];

@Component({
  selector: 'app-mobile-sort-filters',
  templateUrl: './mobile-sort-filters.component.html',
  styleUrls: ['./mobile-sort-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileSortFiltersComponent implements OnInit {
  mobileFiltersSortForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MobileSortFiltersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm();
  }

  submitForm(): void {
    this.dialogRef.close({ ...this.mobileFiltersSortForm.value });
  }

  getSortingDirections(): any[] {
    return this.data && this.data.filterOptions && this.data.filterOptions.sortDirections || DEFAULT_SORT_DIRECTIONS;
  }

  private initForm(): void {
    const { active = '', direction = '' } = this.data.sort || {};

    this.mobileFiltersSortForm = this.fb.group({
      sortActive: this.fb.control(active),
      sortDirection: this.fb.control(direction),
    });
  }
}
