import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import EnlistModal from './enlist_modal';
import styles from './actions.scss';

@inject('store')
@observer
class Actions extends Component {
  @observable isModalOpen = false;

  @autobind
  openModal() {
    this.isModalOpen = true;
  }

  @autobind
  closeModal() {
    this.isModalOpen = false;
  }

  @autobind
  async resign() {}

  render() {
    const tournament = this.props.store.tournamentsStore.item;

    return (
      <div>
        {!tournament.isUserEnlisted && (
          <div>
            <Tooltip title="Enlist">
              <IconButton className={styles.button} onClick={this.openModal}>
                <FontAwesomeIcon size="sm" icon={['far', 'calendar-plus']} />
              </IconButton>
            </Tooltip>
            <EnlistModal open={this.isModalOpen} onClose={this.closeModal} />
          </div>
        )}
        {tournament.isUserEnlisted && (
          <Tooltip title="Resign">
            <IconButton className={styles.button} onClick={this.resign}>
              <FontAwesomeIcon size="sm" icon={['far', 'calendar-minus']} />
            </IconButton>
          </Tooltip>
        )}
      </div>
    );
  }
}

export default Actions;
