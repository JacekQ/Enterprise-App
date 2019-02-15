import { AbstractControl, Validators } from '@angular/forms';
import { PASSWORD_PATTERN } from '../../constants/helpers';

export class CustomPasswordValidator extends Validators {

  static PasswordMatchCriteriaValidator(control: AbstractControl) {
    if (control.value && control.value.length > 3 && !PASSWORD_PATTERN.test(control.value)) {
      return { PatternError: true };
    }

    return null;
  }

  static MatchPasswords(password1, password2) {
    return (control: AbstractControl) => {
      const password = control.get(password1);
      const confirmPassword = control.get(password2);

      if (password.value.length && confirmPassword.value.length) {
        if (password.value !== confirmPassword.value) {
          control.get(password2).setErrors({ PasswordMismatch: true });
        }
      }

      return null;
    };
  }

  static EqualPasswords(AC: AbstractControl) {
    const oldPassword = AC.get('oldPassword').value;
    const newPassword = AC.get('newPassword')
      ? AC.get('newPassword').value : null;
    if (newPassword === oldPassword && newPassword.length > 0) {
      AC.get('newPassword').setErrors({ EqualPasswords: true });
    }
  }
}
