import { Component, OnInit, Output, Input, EventEmitter, OnDestroy, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { animations } from '../../animations';
import { CustomDateFilterService } from './custom-date-filter.service';

@Component({
  selector: 'app-custom-date-filter',
  templateUrl: './custom-date-filter.component.html',
  styleUrls: ['./custom-date-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    animations.transformPanel,
    animations.fadeInContent
  ]
})
export class CustomDateFilterComponent implements OnInit, OnDestroy {

  @HostBinding('@transformPanel') get transformPanel() {
    return true;
  }

  form: FormGroup;

  timeSelectOptions = [];

  fromTimeSelectOptions = [];
  toTimeSelectOptions = [];

  fromDateMax: Date = null;
  fromTimeMax: string = null;
  toDateMin: Date = null;
  toTimeMin: string = null;

  @Input() mode = 'desktop';
  @Input() pickerType = 'date';
  @Input() filterForm: null | FormGroup;
  @Output() applyFilter: EventEmitter<any> = new EventEmitter();

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private translateService: TranslateService,
    private cdfService: CustomDateFilterService) { }

  ngOnInit() {
    this.initForm();
    this.initTimeOptions();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onApplyClick() {
    if (this.form.valid) {
      this.applyFilter.emit(this.form.value);
    }
  }

  private initForm(): void {
    this.form = this.filterForm || this.cdfService.getCustomDateFilterForm();

    this.form.get('fromDate').valueChanges.pipe(
      takeUntil(this.unsubscribe),
      distinctUntilChanged()
    ).subscribe(value => {
      this.toDateMin = new Date(value);

      const { fromTime, toTime, toDate } = this.form.value;

      if (value && toDate && this.cdfService.isSameDate(value, toDate)) {
        this.fromTimeMax = toTime;
        if (fromTime > toTime) {
          this.toTimeMin = toTime;
        } else {
          this.toTimeMin = fromTime;
        }

      } else {
        this.toTimeMin = null;
        this.fromTimeMax = null;
      }

      this.filterTimeOptions();
    });

    this.form.get('toDate').valueChanges.pipe(
      takeUntil(this.unsubscribe),
      distinctUntilChanged()
    ).subscribe(value => {
      this.fromDateMax = new Date(value);
      const { fromDate, fromTime, toTime } = this.form.value;
      if (fromDate && value && this.cdfService.isSameDate(fromDate, value)) {
        this.toTimeMin = fromTime;
        if (fromTime > toTime) {
          this.fromTimeMax = fromTime;
        } else {
          this.fromTimeMax = toTime;
        }
      } else {
        this.toTimeMin = null;
        this.fromTimeMax = null;
      }

      this.filterTimeOptions();
    });

    this.form.get('fromTime').valueChanges.pipe(
      takeUntil(this.unsubscribe),
      distinctUntilChanged()
    ).subscribe(value => {
      const { fromDate, toDate } = this.form.value;
      if (this.cdfService.isSameDate(fromDate, toDate)) {
        this.toTimeMin = value;
      } else {
        this.toTimeMin = null;
        this.fromTimeMax = null;
      }

      this.filterTimeOptions();
    });

    this.form.get('toTime').valueChanges.pipe(
      takeUntil(this.unsubscribe),
      distinctUntilChanged()
    ).subscribe(value => {
      const { fromDate, toDate } = this.form.value;
      if (this.cdfService.isSameDate(fromDate, toDate)) {
        this.fromTimeMax = value;
      } else {
        this.toTimeMin = null;
        this.fromTimeMax = null;
      }

      this.filterTimeOptions();
    });
  }

  private initTimeOptions(): void {
    this.timeSelectOptions = this.cdfService.getTimeSelectOptions(this.translateService.currentLang);
    this.filterTimeOptions();

    this.translateService.onLangChange.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(result => {
      this.timeSelectOptions = this.cdfService.getTimeSelectOptions(result.lang);
      this.filterTimeOptions();
    });
  }

  private filterTimeOptions() {
    const { fromTime, toTime } = this.form.value;

    this.toTimeSelectOptions = this.timeSelectOptions.map(opt => {
      return {
        ...opt,
        disabled: this.toTimeMin ? opt.value < this.toTimeMin : false
      };
    });

    if (this.toTimeMin && toTime < this.toTimeMin) {
      this.form.get('toTime').setValue(this.toTimeMin);
    }

    this.fromTimeSelectOptions = this.timeSelectOptions.map(opt => {
      return {
        ...opt,
        disabled: this.fromTimeMax ? opt.value > this.fromTimeMax : false
      };
    });

    if (this.fromTimeMax && fromTime > this.fromTimeMax) {
      this.form.get('fromTime').setValue(this.fromTimeMax);
    }
  }

}
