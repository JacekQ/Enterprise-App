import { DateFormatPipe } from './date.pipe';

const testDate = new Date('2018-07-10T06:10:34.881794Z');

describe('DateFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new DateFormatPipe();

    expect(pipe).toBeTruthy();
  });

  it('should return date in pl locale since this is default language', () => {
    const expected = '10 lip 2018';
    const pipe = new DateFormatPipe();

    const result = pipe.transform(testDate);
    expect(result).toBe(expected);
  });

  describe('Pipes should return properly formated date', () => {
    it('should return date in pl locale', () => {
      const expected = '10 lip 2018';
      const pipe = new DateFormatPipe();

      const result = pipe.transform(testDate, 'pl');
      expect(result).toBe(expected);
    });

    it('should return date in en locale', () => {
      const expected = 'Jul 10, 2018';
      const pipe = new DateFormatPipe();

      const result = pipe.transform(testDate, 'en');
      expect(result).toBe(expected);
    });

    it('should return date in ru locale', () => {
      const expected = '10 июл. 2018 г.';
      const pipe = new DateFormatPipe();

      const result = pipe.transform(testDate, 'ru');
      expect(result).toBe(expected);
    });
  });

  describe('Pipes should return wrong formated date wrong locale code provided', () => {
    it('should not return date in pl locale', () => {
      const expected = '10 lip 2018';
      const pipe = new DateFormatPipe();

      const result = pipe.transform(testDate, 'en');
      expect(result).not.toBe(expected);
    });

    it('should not return date in en locale', () => {
      const expected = 'Jul 10, 2018';
      const pipe = new DateFormatPipe();

      const result = pipe.transform(testDate, 'ru');
      expect(result).not.toBe(expected);
    });

    it('should not return date in ru locale', () => {
      const expected = '10 июл. 2018 г.';
      const pipe = new DateFormatPipe();

      const result = pipe.transform(testDate, 'pl');
      expect(result).not.toBe(expected);
    });
  });

});

