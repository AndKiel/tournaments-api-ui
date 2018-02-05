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

  hooks() {
    return {
      async onSubmit(form) {
        try {
          form.validate();
          await form.submitImpl();
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error_description
          ) {
            form
              .$('password')
              .invalidate(error.response.data.error_description);
          } else {
            throw error;
          }
        }
      }
    };
  }
}

export default SignInForm;
