import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Typography } from 'material-ui';
import AccountForm from '../forms/account_form';

@inject('store')
@observer
class AccountPage extends Component {
  componentDidMount() {
    if (this.props.store.userStore.user === null) {
      this.props.store.userStore.getUser();
    }
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          {this.props.store.userStore.user ? (
            <AccountForm />
          ) : (
            <Typography>Loading</Typography>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default AccountPage;
