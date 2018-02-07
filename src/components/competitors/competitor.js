import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from 'material-ui';
import RemoveCompetitorButton from './buttons/remove_competitor_button';
import ConfirmCompetitorButton from './buttons/confirm_competitor_button';
import RejectCompetitorButton from './buttons/reject_competitor_button';
import styles from './competitor.scss';

@inject('store')
@observer
class Competitor extends Component {
  render() {
    const { name, status } = this.props.competitor;
    const tournament = this.props.store.tournamentsStore.item;

    return (
      <ListItem>
        <ListItemText
          disableTypography={true}
          primary={<Typography className={styles[status]}>{name}</Typography>}
        />
        {tournament.isUserOrganiser &&
          tournament.status === 'created' && (
            <ListItemSecondaryAction>
              <RemoveCompetitorButton competitor={this.props.competitor} />
              <ConfirmCompetitorButton competitor={this.props.competitor} />
              <RejectCompetitorButton competitor={this.props.competitor} />
            </ListItemSecondaryAction>
          )}
      </ListItem>
    );
  }
}

export default Competitor;
