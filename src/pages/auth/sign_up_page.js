import React, { Component } from "react";
import { translate } from "react-i18next";
import { withRouter } from "react-router";
import { inject } from "mobx-react/index";
import autobind from "autobind-decorator";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from "material-ui";
import SignUpForm from "../../forms/sign_up_form";
import TextInput from "../../components/forms/text_input";
import routes from "../../utils/routes";

@translate()
@withRouter
@inject("store")
class SignUpPage extends Component {
  componentWillMount() {
    this.form = new SignUpForm();
    this.form.submitImpl = this.submitImpl;
  }

  @autobind
  async submitImpl() {
    const data = this.form.values();
    await this.props.store.sessionStore.signUp(data);
    await this.props.store.sessionStore.signIn(data.user);
    this.props.history.push(routes.tournaments());
    this.props.store.uiStore.setAlert(this.props.t("alerts.user.sign_up"));
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
                  {t("pages.sign_up.title")}
                </Typography>
                <TextInput
                  field={this.form.$("user.email")}
                  autoFocus
                  required
                />
                <TextInput
                  field={this.form.$("user.password")}
                  type="password"
                  required
                />
                <TextInput
                  field={this.form.$("user.password_confirmation")}
                  type="password"
                  required
                />
              </CardContent>
              <CardActions>
                <Button color="primary" style={{ flex: 1 }} type="submit">
                  {t("common.buttons.submit")}
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
