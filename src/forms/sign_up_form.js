import { Form } from 'mobx-react-form';

class SignUpForm extends Form {
  setup() {
    return {
      fields: ['user.email', 'user.password', 'user.password_confirmation'],
      labels: {
        'user.email': 'Email',
        'user.password': 'Password',
        'user.password_confirmation': 'Password confirmation'
      }
    };
  }

  hooks() {
    return {
      async onSubmit(form) {
        try {
          form.validate();
          await form.submit();
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.fields
          ) {
            for (let pair of Object.entries(error.response.data.fields)) {
              form.$(`user.${pair[0]}`).invalidate(pair[1].join(', '));
            }
          } else {
            throw error;
          }
        }
      }
    };
  }
}

export default SignUpForm;
