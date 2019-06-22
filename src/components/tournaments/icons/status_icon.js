import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { observer } from "mobx-react/index";
import { Tooltip } from "material-ui";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import styles from "./status_icon.module.scss";

@translate()
@observer
class StatusIcon extends Component {
  render() {
    const { t, status } = this.props;

    switch (status) {
      case "created":
        return (
          <Tooltip title={t("components.tournaments.status_icon.created")}>
            <FontAwesomeIcon
              className={styles.status}
              icon="hourglass-start"
              size="xs"
              fixedWidth
            />
          </Tooltip>
        );
      case "in_progress":
        return (
          <Tooltip title={t("components.tournaments.status_icon.in_progress")}>
            <FontAwesomeIcon
              className={styles.status}
              icon="hourglass-half"
              size="xs"
              fixedWidth
            />
          </Tooltip>
        );
      default:
        return (
          <Tooltip title={t("components.tournaments.status_icon.ended")}>
            <FontAwesomeIcon
              className={styles.status}
              icon="hourglass-end"
              size="xs"
              fixedWidth
            />
          </Tooltip>
        );
    }
  }
}

StatusIcon.propTypes = {
  status: PropTypes.string.isRequired
};

export default StatusIcon;
