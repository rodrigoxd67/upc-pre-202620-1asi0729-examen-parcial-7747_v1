import { FormGroup } from '@angular/forms';

/**
 * base type for reactive form views
 * @author rodrigo andree saavedra flores
 */
export class BaseForm {
  protected isInvalidControl(form: FormGroup, controlName: string): boolean {
    return form.controls[controlName].invalid && form.controls[controlName].touched;
  }

  protected hasControlError(form: FormGroup, controlName: string, errorKey: string): boolean {
    const control = form.controls[controlName];
    return control.touched && control.hasError(errorKey);
  }
}
