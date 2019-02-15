import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, } from '@angular/forms';
import * as moment from 'moment';

import { AtLeastOneFilledValidator } from '../../validators';

export const CUSTOM_DATE_FILTER_EMPTY = {
  fromDate: '',
  fromTime: '00:00',
  toDate: '',
  toTime: '00:00'
};

const TIME_SELECT_OPTION_VALUES = [
  '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
];

@Injectable({
  providedIn: 'root'
})
export class CustomDateFilterService {
  private timeSelectOptions = [];

  constructor(private fb: FormBuilder) {
    const startTime = moment().utcOffset(0);
    startTime.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    startTime.toISOString();
    startTime.format();

    for (let i = 0; i < 48; i++) {
      this.timeSelectOptions.push(moment(startTime).add(i * 30, 'minutes'));
    }
  }

  getTimeSelectOptions(lang = null) {
    return this.timeSelectOptions.map((opt, index) => {
      if (lang) {
        opt.locale(lang);
      }
      return { // set it to 00:00 00:30 not depending on timezone
        value: TIME_SELECT_OPTION_VALUES[index], label: opt.format('LT')
      };
    });
  }

  getCustomDateFilterForm(): FormGroup {
    const start = new Date(new Date().getFullYear(), 0, 1);
    const end = new Date();
    return this.fb.group({
      fromDate: this.fb.control(start),
      fromTime: this.fb.control('00:00'),
      toDate: this.fb.control(end),
      toTime: this.fb.control('00:00')
    }, { validator: [AtLeastOneFilledValidator(['fromDate', 'toDate'])] });
  }

  isSameDate(d1: Date, d2: Date): boolean {
    const dm1 = moment(d1);
    const dm2 = moment(d2);
    return dm1.format('YYYY/MM/DD') === dm2.format('YYYY/MM/DD');
  }
}
