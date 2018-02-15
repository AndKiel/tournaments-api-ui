import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { inject, observer } from 'mobx-react/index';
import { observable } from 'mobx';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import ConfirmationDialog from '../../utils/confirmation_dialog';

@translate()
@inject('store')
@observer
class RemoveCompetitorButton extends Component {
  @observable isDialogOpen = false;

  @autobind
  openDialog() {
    this.isDialogOpen = true;
  }

  @autobind
  closeDialog() {
    this.isDialogOpen = false;
  }

  @autobind
  async removeCompetitor() {
    await this.props.store.tournamentsStore.item.removeCompetitor(
      this.props.competitor.id
    );
    this.props.store.uiStore.setAlert(this.props.t('alerts.competitor.delete'));
  }

  render() {
    const tournament = this.props.store.tournamentsStore.item;

    if (
      tournament.isUserOrganiser &&
      tournament.status === 'created' &&
      this.props.competitor.user_id === null
    ) {
      const { t } = this.props;

      return (
        <div>
          <Tooltip
            title={t('components.competitors.buttons.remove_competitor')}
          >
            <IconButton onClick={this.openDialog}>
              <FontAwesomeIcon size="xs" icon="user-times" />
            </IconButton>
          </Tooltip>
          <ConfirmationDialog
            onClose={this.closeDialog}
            onConfirm={this.removeCompetitor}
            open={this.isDialogOpen}
            title={t('dialogs.competitor.delete.title')}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

RemoveCompetitorButton.propTypes = {
  competitor: PropTypes.object.isRequired
};

export default RemoveCompetitorButton;
