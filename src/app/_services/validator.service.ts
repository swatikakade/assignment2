import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor(private userService: UserService) { }

  public compareValidator(controlToValidate: string, controlToCompare: string) : ValidatorFn
  {
    return (formGroup: FormGroup): ValidationErrors | null =>{
      if(!formGroup.get(controlToValidate).value)
        return null;  // return  if confirm password is null
      
      if(formGroup.get(controlToValidate).value == formGroup.get(controlToCompare).value )
       return null; // Valid
      else{
        formGroup.get(controlToValidate).setErrors({ comparePasswords: {valid: false}});
        return { comparePasswords: {valid: false} };  // Invalid
      }
    }
  }

  public uniqueEmailValidator(): AsyncValidatorFn
  {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userService.getUserByEmail(control.value).pipe(map((existingUser: any) => 
      {
        if(existingUser.length > 0){
          control.setErrors({uniqueEmail: {valid: false}});
          return {uniqueEmail: {valid:false}};  // Invalid
        }else{
          return null; // Valid
        }
      }));
    }
  }

  public urlValidator(value): any {
    if (value.pristine) {
        return null;
    }
    if (value.value.length === 0) {
        return;
    }
  
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    value.markAsTouched();

    if (urlRegex.test(value.value)) {
        return null;
    }
    return {
        urlValidator: true
    };
  }
}