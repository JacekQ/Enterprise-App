import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DATE_FORMAT } from '../../constants';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {
  transform(value: any, language: string = 'pl'): any {
    if (!value) {
      return value;
    }
    return formatDate(value, DATE_FORMAT.MEDIUM, language);
  }
}
