import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid } from 'material-ui';
import AccountForm from '../forms/account_form';

@inject('store')
@observer
class AccountPage extends Component {
  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AccountForm />
        </Grid>
      </Grid>
    );
  }
}

export default AccountPage;
