import { FormControl, FormGroup } from '@angular/forms';
import { AtLeastOneFilledValidator } from './at-least-one-filled.validator';

describe('AtLeastOneFilledValidator', () => {

    let field1: FormControl,
        field2: FormControl,
        field3: FormControl,
        fg: FormGroup;

    const atLeastOneFilledValidator = AtLeastOneFilledValidator(['field1', 'field2', 'field3']);

    beforeEach(() => {
        field1 = new FormControl('');
        field2 = new FormControl('');
        field3 = new FormControl('');
        fg = new FormGroup({
            field1, field2, field3
        }, [atLeastOneFilledValidator]);
    });

    it('should have error on formGroup if no control is filled', () => {
        expect(fg.hasError('OneFilledOut')).toEqual(true);
    });

    it('should have no error on formGroup if at least one control is filled', () => {
        fg.get('field1').setValue('jane doe');

        expect(fg.hasError('OneFilledOut')).toEqual(false);
    });

    it('should have sufixed error on formGroup if no control has value filled', () => {
        const newValidator = AtLeastOneFilledValidator(['field1', 'field2', 'field3'], '_sfx');
        fg = new FormGroup({
            field1, field2, field3
        }, [newValidator]);

        expect(fg.hasError('OneFilledOut_sfx')).toEqual(true);
    });

    it('should have 1 sufixed error on formGroup if validation fails in both cases', () => {
        const newValidator = AtLeastOneFilledValidator(['field1', 'field2'], '_sfx');
        const newValidator2 = AtLeastOneFilledValidator(['field1', 'field3'], '_sfx2');
        fg = new FormGroup({
            field1, field2, field3
        }, [newValidator, newValidator2]);
        fg.get('field3').setValue('joe doe');

        expect(fg.hasError('OneFilledOut_sfx')).toEqual(true);
        expect(fg.hasError('OneFilledOut_sfx2')).toEqual(false);
    });

    it('should have 2 sufixed errors on formGroup if validation fails in both cases', () => {
        const newValidator = AtLeastOneFilledValidator(['field1', 'field2'], '_sfx');
        const newValidator2 = AtLeastOneFilledValidator(['field1', 'field3'], '_sfx2');
        fg = new FormGroup({
            field1, field2, field3
        }, [newValidator, newValidator2]);

        expect(fg.hasError('OneFilledOut_sfx')).toEqual(true);
        expect(fg.hasError('OneFilledOut_sfx2')).toEqual(true);
    });

});
