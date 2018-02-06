import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import {
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  Typography
} from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './competitor.scss';

@inject('store')
@observer
class Competitor extends Component {
  @autobind
  async removeCompetitor() {
    await this.props.store.tournamentsStore.item.removeCompetitor(
      this.props.competitor.id
    );
    this.props.store.uiStore.setAlert(
      'success',
      'You have seuccessfully removed a competitor from a tournament.'
    );
  }

  @autobind
  async confirmCompetitor() {
    await this.props.competitor.confirm();
    this.props.store.uiStore.setAlert(
      'success',
      'You have successfully confirmed a competitor.'
    );
  }

  @autobind
  async rejectCompetitor() {
    await this.props.competitor.reject();
    this.props.store.uiStore.setAlert(
      'success',
      'You have successfully rejected a competitor.'
    );
  }

  render() {
    const { name, status } = this.props.competitor;

    return (
      <ListItem>
        <ListItemText
          disableTypography={true}
          primary={<Typography className={styles[status]}>{name}</Typography>}
        />
        {this.props.store.sessionStore.isSignedIn && (
          <ListItemSecondaryAction>
            {this.props.competitor.user_id === null && (
              <Tooltip title="Remove competitor">
                <IconButton onClick={this.removeCompetitor}>
                  <FontAwesomeIcon size="xs" icon="user-times" />
                </IconButton>
              </Tooltip>
            )}
            {this.props.store.tournamentsStore.item.status === 'created' &&
              (status === 'enlisted' ? (
                <Tooltip title="Confirm">
                  <IconButton onClick={this.confirmCompetitor}>
                    <FontAwesomeIcon size="xs" icon="check" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Reject">
                  <IconButton onClick={this.rejectCompetitor}>
                    <FontAwesomeIcon size="xs" icon="times" />
                  </IconButton>
                </Tooltip>
              ))}
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}

export default Competitor;
