import { ValidatorFn, FormGroup } from '@angular/forms';

export const AtLeastOneFilledValidator = (controlNames: string[], errorSufix?): ValidatorFn => {
    return (group: FormGroup): { [key: string]: boolean } => {
        const fields = [];

        controlNames.forEach(cName => {
            if (group.controls.hasOwnProperty(cName)) {
                fields.push(group.get(cName).value);
            }
        });

        const result = fields.filter(field => !!field);
        const valid = result.length !== 0;
        const errorName = 'OneFilledOut' + (errorSufix || '');

        return valid ? null : {
            [errorName]: true
        };
    };
};
