import { Directive, Input } from '@angular/core';
import { FormControl, FormGroup, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordMatchDirective, multi: true}]
})
export class PasswordMatchDirective {

  @Input('appPasswordMatch') appPasswordMatch: any;
  confirm_pass : any

  constructor() { }

  validate( control : FormControl ) : ValidationErrors | null {

    this.confirm_pass = control?.value
    const password = control.root.get(this.appPasswordMatch)?.value

    if(password == this.confirm_pass && this.confirm_pass?.length > 0){
        return null
    }
    else{
      return {'error' : true}
    }
  }
}
