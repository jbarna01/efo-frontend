import {AbstractControl, FormControl, FormGroup, ValidationErrors} from '@angular/forms';

export class ComponentBase {

  // positiveNumValidator(control: FormControl) {
  //   if (control.value < 0) return { negativeNum: true };
  // }

  isFieldInvalid(field: string, validateForm: FormGroup) {
    return !validateForm.get(field)?.valid && validateForm.get(field)?.touched;
  }

  displayFieldCss(field: string, validateForm: FormGroup) {
    return {
      'has-error': this.isFieldInvalid(field, validateForm),
      'has-feedback': this.isFieldInvalid(field, validateForm)
    };
  }

  addFieldErrors(control: AbstractControl, errors: ValidationErrors): void {
    control.setErrors({
      ...control.errors,
      ...errors
    });
  }

  removeFieldError(control: AbstractControl, errorName: string): void {
    if (control.errors == null) {
      return;
    }
    const errorNames = Object.keys(control.errors);
    if (errorNames.length === 0 || (errorNames.length === 1 && errorNames[0] === errorName)) {
      control.setErrors(null);
    }
    else {
      const {[errorName]: propertyToRemove, ...remainingProperties} = control.errors;
      control.setErrors({
        ...remainingProperties
      });
    }
  }

  getValidationErrorText(control: AbstractControl): string {

    if (control.hasError('minlength')) {
      const minLength: number = control.getError('minlength').requiredLength;
      return `A mező hossza minimum ${minLength} lehet`;
    }
    else if (control.hasError('maxlength')) {
      const maxLength: number = control.getError('maxlength').requiredLength;
      return `A mező hossza maximum ${maxLength} lehet`;
    }
    else if (control.hasError('min')) {
      const minValue: number = control.getError('min').min;
      return `A mező legkisebb értéke ${minValue} lehet`;
    }
    else if (control.hasError('max')) {
      const maxValue: number = control.getError('max').max;
      return `A mező legnagyobb értéke ${maxValue} lehet`;
    }
    else if (control.hasError('email')) {
      return `Az email cím formátuma nem megfelelő`;
    }
    else if (control.hasError('emailOrTelRequired')) {
      return `E-mail cím vagy Telefonszám kitöltése kötelező`;
    }
    else if (control.hasError('azonOrSzeidRequired')) {
      return `Azonosító száma vagy Szervezeti egység kitöltése kötelező`;
    }
    else if (control.hasError('kezdetNapKesobbi')) {
      return `A kezdődátum későbbi mint a záródátum!`;
    }
    else if (control.hasError('napszakElejeKesobbi')) {
      return `A kezdőidőpont későbbi mint a záróidőpont!`;
    }
    else if (control.hasError('publikalasKotelezo')) {
      return `A dátum megadása kötelező, ha az EESZT-be feltöltés után azonnal megismerhető nincs bejelölve`;
    }
    else if (control.hasError('publikalasiDatumKesobbi')) {
      return `A publikálás dátuma korábbi mint az aktuális dátum`;
    }
    else if (control.hasError('requiredIfKozfinanszirozott')) {
      return `A mező kitöltése kötelező, ha a szolgáltatás közfinanszírozott.`;
    }
    else if (control.hasError('ejfelUtani')) {
      return `A záró időpont maximum 23:59 lehet`;
    }
    else if (control.hasError('required')) {
      return 'A mező kitöltése kötelező';
    }
    // else
    return '';
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  disableAllFormField(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.disable();
      } else if (control instanceof FormGroup) {
        this.disableAllFormField(control);
      }
    });
  }

  enableAllFormField(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.enable();
      } else if (control instanceof FormGroup) {
        this.enableAllFormField(control);
      }
    });
  }

  sanitizeAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (control.value != null && typeof control.value === 'string' && control.value.trim() === '') {
          control.setValue(null);
        }
      } else if (control instanceof FormGroup) {
        this.sanitizeAllFormFields(control);
      }
    });
  }
}
