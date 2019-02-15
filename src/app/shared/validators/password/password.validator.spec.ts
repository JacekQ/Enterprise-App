import { FormControl, FormGroup } from '@angular/forms';
import { CustomPasswordValidator } from './password.validator';

describe('CustomPasswordValidator', () => {

  describe('PasswordMatchCriteriaValidator', () => {
    const customPasswordValidator = CustomPasswordValidator.PasswordMatchCriteriaValidator;
    const control = new FormControl('input');

    it('should check if provided password is in correct pattern and returns pattern error ', () => {
      control.setValue('1234511111');
      expect(customPasswordValidator(control)).toEqual({ PatternError: true });
    });

    it('should return null, the minimum length of password is 3', () => {
      control.setValue('');
      expect(customPasswordValidator(control)).toBeNull();
    });

    it('should return password without error password in correct pattern', () => {
      control.setValue('Test1234!');
      expect(customPasswordValidator(control)).toBeNull();
    });
  });

  describe('MatchPasswords', () => {
    const matchPasswordValidator = CustomPasswordValidator.MatchPasswords('newPassword', 'newPassword2');
    const newPassword = new FormControl('input');
    const newPassword2 = new FormControl('input');
    const formGroup = new FormGroup({ newPassword, newPassword2 });

    it('should check if provided password are same, and returns PasswordMismatch error', () => {
      formGroup.setValue({
        newPassword: '12345',
        newPassword2: '33456'
      });

      matchPasswordValidator(formGroup);

      expect(formGroup.controls['newPassword2'].hasError('PasswordMismatch')).toBeTruthy();
    });

    it('should return null, the minimum length of password is 3', () => {
      formGroup.setValue({
        newPassword: '',
        newPassword2: ''
      });

      expect(matchPasswordValidator(formGroup)).toBeNull();
    });

    it('should return true passwords are the same', () => {
      formGroup.setValue({
        newPassword: 'Test1234!',
        newPassword2: 'Test1234!'
      });

      matchPasswordValidator(formGroup);

      expect(formGroup.controls['newPassword2'].hasError('PasswordMismatch')).toBeFalsy();
    });
  });
});
