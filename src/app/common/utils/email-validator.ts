import {AbstractControl, ValidationErrors} from "@angular/forms";

export function emailValidator(control: AbstractControl): ValidationErrors {
  const pattern: RegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  if (control.value?.length > 0 && !pattern.test(control.value)) {
    return { email: true };
  }

  return null;
}
