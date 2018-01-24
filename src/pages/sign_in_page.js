import React, { Component } from 'react';
import { Grid } from 'material-ui';
import SignInForm from '../forms/sign_in_form';

class SignInPage extends Component {
  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SignInForm />
        </Grid>
      </Grid>
    );
  }
}

export default SignInPage;
