import React, { Component } from "react";
import { translate } from "react-i18next";
import { observable } from "mobx";
import { inject, observer } from "mobx-react/index";
import autobind from "autobind-decorator";
import { IconButton, Tooltip } from "material-ui";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import NewRoundModal from "../../modals/new_round_modal";

@translate()
@inject("store")
@observer
class NewRoundButton extends Component {
  @observable isModalOpen = false;

  @autobind
  openModal() {
    this.isModalOpen = true;
  }

  @autobind
  closeModal() {
    this.isModalOpen = false;
  }

  render() {
    const tournament = this.props.store.tournamentsStore.item;

    if (tournament.status !== "ended") {
      const { t } = this.props;

      return (
        <div>
          <Tooltip title={t("components.rounds.buttons.new_round")}>
            <IconButton color="primary" onClick={this.openModal}>
              <FontAwesomeIcon size="sm" icon="plus-circle" fixedWidth />
            </IconButton>
          </Tooltip>
          <NewRoundModal open={this.isModalOpen} onClose={this.closeModal} />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default NewRoundButton;
