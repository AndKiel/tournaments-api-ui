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
import SignUpForm from '../../forms/sign_up_form';
import TextInput from '../../components/forms/text_input';
import routes from '../../utils/routes';

@withRouter
@inject('store')
class SignUpPage extends Component {
  componentWillMount() {
    this.form = new SignUpForm();
    this.form.submit = this.submit;
  }

  @autobind
  async submit() {
    await this.props.store.sessionStore.signUp(this.form.values());
    this.props.history.push(routes.signIn());
    this.props.store.uiStore.setAlert(
      'success',
      'You have successfully signed up.'
    );
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <form onSubmit={this.form.onSubmit}>
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
