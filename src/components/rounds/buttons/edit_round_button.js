import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import EditRoundModal from '../../modals/edit_round_modal';

@translate()
@inject('store')
@observer
class EditRoundButton extends Component {
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

    if (tournament.status !== 'ended') {
      const { t } = this.props;

      return (
        <div>
          <Tooltip title={t('common.buttons.edit')}>
            <IconButton onClick={this.openModal}>
              <FontAwesomeIcon size="xs" icon="edit" fixedWidth />
            </IconButton>
          </Tooltip>
          <EditRoundModal
            round={this.props.round}
            open={this.isModalOpen}
            onClose={this.closeModal}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

EditRoundButton.propTypes = {
  round: PropTypes.object.isRequired
};

export default EditRoundButton;
