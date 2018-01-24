import React, { Component } from 'react';
import { Grid } from 'material-ui';
import SignUpForm from '../forms/sign_up_form';

class SignUpPage extends Component {
  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SignUpForm />
        </Grid>
      </Grid>
    );
  }
}

export default SignUpPage;
