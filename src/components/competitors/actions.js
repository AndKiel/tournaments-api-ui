import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import AddCompetitorModal from './add_competitor_modal';
import EnlistModal from './enlist_modal';
import styles from './actions.scss';

@inject('store')
@observer
class Actions extends Component {
  @observable isAddCompetitorModalOpen = false;
  @observable isEnlistModalOpen = false;

  @autobind
  openAddCompetitorModal() {
    this.isAddCompetitorModalOpen = true;
  }

  @autobind
  closeAddCompetitorModal() {
    this.isAddCompetitorModalOpen = false;
  }

  @autobind
  openEnlistModal() {
    this.isEnlistModalOpen = true;
  }

  @autobind
  closeEnlistModal() {
    this.isEnlistModalOpen = false;
  }

  @autobind
  async resign() {
    const tournament = this.props.store.tournamentsStore.item;
    await tournament.resign();
    this.props.store.uiStore.setAlert(
      'You have successfully resigned from a tournament.'
    );
  }

  render() {
    const tournament = this.props.store.tournamentsStore.item;

    return (
      <div>
        {tournament.isUserOrganiser && (
          <div className={styles.button}>
            <Tooltip title="Add competitor">
              <IconButton onClick={this.openAddCompetitorModal}>
                <FontAwesomeIcon size="sm" icon="user-plus" />
              </IconButton>
            </Tooltip>
            <AddCompetitorModal
              open={this.isAddCompetitorModalOpen}
              onClose={this.closeAddCompetitorModal}
            />
          </div>
        )}
        {!tournament.isUserEnlisted && (
          <div className={styles.button}>
            <Tooltip title="Enlist">
              <IconButton onClick={this.openEnlistModal}>
                <FontAwesomeIcon size="sm" icon={['far', 'calendar-plus']} />
              </IconButton>
            </Tooltip>
            <EnlistModal
              open={this.isEnlistModalOpen}
              onClose={this.closeEnlistModal}
            />
          </div>
        )}
        {tournament.isUserEnlisted && (
          <Tooltip title="Resign">
            <IconButton onClick={this.resign}>
              <FontAwesomeIcon size="sm" icon={['far', 'calendar-minus']} />
            </IconButton>
          </Tooltip>
        )}
      </div>
    );
  }
}

export default Actions;
