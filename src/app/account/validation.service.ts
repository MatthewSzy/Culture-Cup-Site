export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
      let config = {
        required: 'Required',
        invalidCreditCard: 'Is invalid credit card number',
        invalidEmailAddress: 'Invalid email address',
        invalidPassword:
          'Invalid password. Password must be at least 6 characters long, and contain a number.',
        minlength: `Minimum length ${validatorValue.requiredLength}`
      };
  
      return config[validatorName];
    }

    static emailValidator(control: { value: string; }) {
        if (
          control.value.match(
            "^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$"
          )) { return null;
        } 
        else {
          return { invalidEmailAddress: true };
        }
    }

    static passwordValidator(control: { value: string; }) {
        if (control.value.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")) {
          return null;
        } 
        else {
          return { invalidPassword: true };
        }
      }
}