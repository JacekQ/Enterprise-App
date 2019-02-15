import { Component, OnInit, Input, OnDestroy, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CustomDateFilter, DateTimeTypes } from '../../../../shared';

@Component({
  selector: 'app-customer-list-filters',
  templateUrl: './customer-list-filters.component.html',
  styleUrls: ['./customer-list-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListFiltersComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() filterOptions: any;
  @Input() mode = 'desktop';

  @Output() applyDateFilter: Subject<CustomDateFilter> = new Subject<CustomDateFilter>();

  showCustomDateFilter = false;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit() {
    if (this.form) {
      if (this.form.get('dateFilter').value === DateTimeTypes.CUSTOM) {
        this.showCustomDateFilter = true;
        this.form.get('dates').enable();
      } else {
        this.form.get('dates').disable();
      }

      this.form.get('dateFilter').valueChanges
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(value => {
          if (value !== DateTimeTypes.CUSTOM) {
            this.showCustomDateFilter = false;
            this.form.get('dates').disable();
          } else {
            this.showCustomDateFilter = true;
            this.form.get('dates').enable();
          }
        });
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onFilterApply(value) {
    this.applyDateFilter.next(value);
  }

}
