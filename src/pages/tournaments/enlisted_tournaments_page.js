import React, { Component } from "react";
import { translate } from "react-i18next";
import { inject, observer } from "mobx-react/index";
import autobind from "autobind-decorator";
import { Grid, Typography } from "material-ui";
import TournamentsFilters from "../../components/tournaments/tournaments_filters";
import TournamentCard from "../../components/tournaments/tournament_card";
import Pagination from "../../components/utils/pagination";

@translate()
@inject("store")
@observer
class EnlistedTournamentsPage extends Component {
  componentWillMount() {
    this.setup();
  }

  @autobind
  setup() {
    this.props.store.enlistedTournamentsStore.getTournaments();
  }

  @autobind
  onChangePage(event, page) {
    this.props.store.enlistedTournamentsStore.getTournaments(page + 1);
  }

  render() {
    const { t } = this.props;
    const {
      collection,
      totalCount,
      page
    } = this.props.store.enlistedTournamentsStore;

    return (
      <div>
        <Typography variant="headline" paragraph>
          {t("pages.enlisted_tournaments.title")}
        </Typography>
        <TournamentsFilters onFilter={this.setup} />
        <Grid container spacing={24}>
          {collection.map(t => {
            return (
              <Grid item xs={12} md={6} lg={4} xl={3} key={t.id}>
                <TournamentCard tournament={t} withLimit clickable />
              </Grid>
            );
          })}
          <Pagination
            count={totalCount}
            page={page}
            onChangePage={this.onChangePage}
          />
        </Grid>
      </div>
    );
  }
}

export default EnlistedTournamentsPage;
