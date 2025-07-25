import { AbstractControl } from "@angular/forms";

export function PasswordValidation(control: AbstractControl) {
    if (control.value.toUpperCase() == "PASSWORD") {
        return {
            weakPassword: true
        }
    }
    return null;
}