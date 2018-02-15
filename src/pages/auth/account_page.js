import React, { Component } from 'react';
import { translate } from 'react-i18next';
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
import AccountForm from '../../forms/account_form';
import TextInput from '../../components/forms/text_input';

@translate()
@inject('store')
class AccountPage extends Component {
  componentWillMount() {
    this.form = new AccountForm({
      initials: {
        'user.email': this.props.store.userStore.user.email
      }
    });
    this.form.submitImpl = this.submitImpl;
  }

  @autobind
  async submitImpl() {
    await this.props.store.userStore.updateUser(this.form.values());
    this.props.store.uiStore.setAlert(this.props.t('alerts.user.update'));
  }

  render() {
    const { t } = this.props;

    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <form onSubmit={this.form.onSubmit}>
              <CardContent>
                <Typography variant="headline">
                  {t('pages.account.title')}
                </Typography>
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
                  {t('common.buttons.update')}
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
