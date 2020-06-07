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
import TournamentForm from "../../forms/tournament_form";
import TextInput from "../../components/forms/text_input";
import DatetimeInput from "../../components/forms/datetime_input";
import ArrayInput from "../../components/forms/array_input";
import routes from "../../utils/routes";
import moment from "moment";

@translate()
@withRouter
@inject("store")
class NewTournamentPage extends Component {
  componentWillMount() {
    this.form = new TournamentForm({
      initials: {
        "tournament.starts_at": moment()
      },
      values: {
        tournament: {
          result_names: [
            this.props.t("forms.values.tournament.result_names.win"),
            this.props.t("forms.values.tournament.result_names.points")
          ]
        }
      }
    });
    this.form.submitImpl = this.submitImpl;
  }

  @autobind
  async submitImpl() {
    const data = this.form.values();
    data.tournament.competitors_limit = parseInt(data.tournament.competitors_limit, 10);
    const response = await this.props.store.organisedTournamentsStore.createTournament(data);
    this.props.history.push(routes.tournament(response.data.tournament.id));
    this.props.store.uiStore.setAlert(this.props.t("alerts.tournament.create"));
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
                  {t("pages.new_tournament.title")}
                </Typography>
                <TextInput
                  field={this.form.$("tournament.name")}
                  autoFocus
                  required
                />
                <TextInput
                  field={this.form.$("tournament.description")}
                  multiline
                  rows={5}
                />
                <DatetimeInput
                  field={this.form.$("tournament.starts_at")}
                  required
                />
                <TextInput
                  field={this.form.$("tournament.competitors_limit")}
                  type="number"
                  required
                />
                <ArrayInput field={this.form.$("tournament.result_names")} />
              </CardContent>
              <CardActions>
                <Button color="primary" style={{ flex: 1 }} type="submit">
                  {t("common.buttons.create")}
                </Button>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default NewTournamentPage;
