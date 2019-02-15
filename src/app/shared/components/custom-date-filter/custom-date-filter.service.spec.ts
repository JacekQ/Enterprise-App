import { TestBed, inject } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';

import { CustomDateFilterService } from './custom-date-filter.service';

describe('CustomDateFilterService', () => {
  let service: CustomDateFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomDateFilterService,
        FormBuilder
      ]
    });

    service = TestBed.get(CustomDateFilterService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isSameDate', () => {
    it('should return true if dates are the same', () => {
      const d1 = new Date(2018, 6, 6, 0, 0, 0, 0);
      const d2 = new Date(2018, 6, 6, 10, 10, 10, 10);

      expect(service.isSameDate(d1, d2)).toEqual(true);
    });

    it('should return false if dates are the same', () => {
      const d1 = new Date(2018, 6, 5);
      const d2 = new Date(2018, 6, 6);

      expect(service.isSameDate(d1, d2)).toEqual(false);
    });
  });

  describe('getTimeSelectOptions', () => {
    it('should return array of times with 30m interval', () => {
      const result = service.getTimeSelectOptions();

      expect(result[0].value).toEqual('00:00');
      expect(result[10].value).toEqual('05:00');
    });

    it('should return array of times with 30m interval and label base on locales', () => {
      const resultPl = service.getTimeSelectOptions('pl');
      const resultEn = service.getTimeSelectOptions('en');

      expect(resultPl[0]).toEqual({ value: '00:00', label: '00:00' });
      expect(resultPl[27]).toEqual({ value: '13:30', label: '13:30' });
      expect(resultEn[0]).toEqual({ value: '00:00', label: '12:00 AM' });
      expect(resultEn[27]).toEqual({ value: '13:30', label: '1:30 PM' });
    });
  });

  describe('getCustomDateFilterForm', () => {
    it('should return formGroup for customDateFilterForm and structure of CustomDateFilter ', () => {
      const result = service.getCustomDateFilterForm();
      const { fromDate, fromTime, toDate, toTime } = result.value;

      expect(fromDate instanceof Date).toEqual(true);
      expect(fromTime).toEqual('00:00');
      expect(toDate instanceof Date).toEqual(true);
      expect(toTime).toEqual('00:00');
    });
  });
});
