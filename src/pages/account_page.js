import React, { Component } from 'react';
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
import AccountForm from '../forms/account_form';
import TextInput from '../components/forms/text_input';

@inject('store')
class AccountPage extends Component {
  componentWillMount() {
    this.form = new AccountForm({
      initials: {
        'user.email': this.props.store.userStore.user.email
      }
    });
    this.form.submit = this.submit;
  }

  @autobind
  async submit() {
    await this.props.store.userStore.updateUser(this.form.values());
    this.props.store.uiStore.setAlert(
      'success',
      'You have successfully updated your account.'
    );
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <form onSubmit={this.form.onSubmit}>
              <CardContent>
                <Typography type="headline">Account</Typography>
                <TextInput
                  field={this.form.$('user.email')}
                  autoFocus
                  required
                />
                <TextInput
                  field={this.form.$('user.password')}
                  type="password"
                />
                <TextInput
                  field={this.form.$('user.password_confirmation')}
                  type="password"
                />
              </CardContent>
              <CardActions>
                <Button color="primary" style={{ flex: 1 }} type="submit">
                  Update
                </Button>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default AccountPage;
