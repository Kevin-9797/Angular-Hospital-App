import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
 
export const validatePassword: ValidatorFn = (control:AbstractControl): ValidationErrors | null => {
     const password = control.get('password');
     
     const confirmPassword = control.get('password2');
     
        if(password?.value !== confirmPassword?.value){
            confirmPassword?.setErrors({ notEqualsPass: true })

        }
        return ( password?.value !== confirmPassword?.value ) ? { notEqualsPass: true} : null;
    }


 
    export const acceptTerms: ValidatorFn = (control:AbstractControl): ValidationErrors | null => {
        const terms = control.get('terms');
        
        
           if( !terms?.value ){
               terms?.setErrors({ notEqualsPass: true })
   
           }
           return ( !terms?.value ) ? { notEqualsPass: true} : null;
       }
   
   
   