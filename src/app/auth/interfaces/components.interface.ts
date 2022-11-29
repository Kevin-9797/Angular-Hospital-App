import { ValidatorFn, Validators } from '@angular/forms';
export interface DataInput{
    name: string; 
    value?: string ;
    type?: string; 
    validators: ValidatorFn[];
  }


  export interface DataInputCheckbox extends DataInput{

    valueCheckbox: boolean;

  }