import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DATE_FORMAT } from '../../constants';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, language: string = 'pl'): any {
    if (!value) {
      return value;
    }
    return formatDate(value, DATE_FORMAT.MEDIUM_DATE, language);
  }
}

