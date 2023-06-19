// import { FormGroup } from '@angular/forms';
// export function MustMatch(password: string, confirmPassword: string) {
//     return (formGroup : FormGroup) => {
//         const passwordControl = formGroup.controls[password];
//         const confirmPasswordControl = formGroup.controls[confirmPassword];
//         if(confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch'])
//         {
//             return null;
//         }
//         if(passwordControl.value != confirmPasswordControl.value){
//             confirmPasswordControl.setErrors({mustMatch: true});
//         } else {
//             confirmPasswordControl.setErrors(null);
//         }

//     }
// }

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function MustMatch(password: string, confirmPassword: string): ValidatorFn {
    return (ctrl: AbstractControl) : ValidationErrors | null => {
        const passwordwordControl = ctrl.get(password);
        const confirmPasswordControl = ctrl.get(confirmPassword);


        if(confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
            return null;
        }

        if(passwordwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ mustMatch: true });
        } else {
            confirmPasswordControl.setErrors(null);
        }

        return null;
    }
}
