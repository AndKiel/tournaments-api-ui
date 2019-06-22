import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { inject, observer } from "mobx-react/index";
import autobind from "autobind-decorator";
import { ButtonBase, Typography } from "material-ui";
import RemoveCompetitorButton from "./buttons/remove_competitor_button";
import styles from "./competitor.module.scss";

@translate()
@inject("store")
@observer
class Competitor extends Component {
  @autobind
  async toggleCompetitor() {
    const tournament = this.props.store.tournamentsStore.item;

    if (tournament.isUserOrganiser && tournament.status === "created") {
      if (this.props.competitor.status === "enlisted") {
        await this.confirmCompetitor();
      } else {
        await this.rejectCompetitor();
      }
    }
  }

  @autobind
  async confirmCompetitor() {
    await this.props.competitor.confirm();
    this.props.store.uiStore.setAlert(
      this.props.t("alerts.competitor.confirm")
    );
  }

  @autobind
  async rejectCompetitor() {
    await this.props.competitor.reject();
    this.props.store.uiStore.setAlert(this.props.t("alerts.competitor.reject"));
  }

  render() {
    const { name, parsedCreatedAt, status } = this.props.competitor;
    const tournament = this.props.store.tournamentsStore.item;

    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <ButtonBase
            onClick={this.toggleCompetitor}
            disableRipple
            disabled={
              !(tournament.isUserOrganiser && tournament.status === "created")
            }
          >
            <Typography className={styles[status]}>{name}</Typography>
          </ButtonBase>
          <Typography className={styles.date}>
            {parsedCreatedAt.format("DD/MM/YYYY HH:mm")}
          </Typography>
        </div>
        <RemoveCompetitorButton competitor={this.props.competitor} />
      </div>
    );
  }
}

Competitor.propTypes = {
  competitor: PropTypes.object.isRequired
};

export default Competitor;
