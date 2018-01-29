import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from 'material-ui';
import SignUpForm from '../forms/sign_up_form';
import TextInput from '../components/forms/text_input';
import routes from '../utils/routes';

@withRouter
@inject('store')
class SignUpPage extends Component {
  componentWillMount() {
    this.form = new SignUpForm();
  }

  @autobind
  async submitForm(e) {
    try {
      e.preventDefault();
      await this.form.validate();
      await this.props.store.sessionStore.signUp(this.form.values());
      this.props.history.push(routes.signIn());
      this.props.store.uiStore.setAlert(
        'success',
        'You have successfully signed up.'
      );
    } catch (error) {
      if (error.response && error.response.data && error.response.data.fields) {
        for (let pair of Object.entries(error.response.data.fields)) {
          this.form.$(`user.${pair[0]}`).invalidate(pair[1].join(', '));
        }
      } else {
        throw error;
      }
    }
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <form onSubmit={this.submitForm}>
              <CardContent>
                <Typography type="headline">Sign up</Typography>
                <TextInput
                  field={this.form.$('user.email')}
                  autoFocus
                  required
                />
                <TextInput
                  field={this.form.$('user.password')}
                  type="password"
                  required
                />
                <TextInput
                  field={this.form.$('user.password_confirmation')}
                  type="password"
                  required
                />
              </CardContent>
              <CardActions>
                <Button color="primary" style={{ flex: 1 }} type="submit">
                  Submit
                </Button>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default SignUpPage;
