import { Form } from 'mobx-react-form';

class SignInForm extends Form {
  setup() {
    return {
      fields: [
        {
          name: 'email',
          label: 'Email'
        },
        {
          name: 'password',
          label: 'Password'
        }
      ]
    };
  }
}

export default SignInForm;
