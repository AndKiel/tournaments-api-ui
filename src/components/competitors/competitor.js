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
  async confirmCompetitor() {
    await this.props.competitor.confirm();
    this.props.store.uiStore.setAlert(
      'success',
      'You have successfully confirmed a competitor.'
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
        {this.props.store.sessionStore.isSignedIn &&
          status === 'enlisted' && (
            <ListItemSecondaryAction>
              <Tooltip title="Confirm">
                <IconButton onClick={this.confirmCompetitor}>
                  <FontAwesomeIcon size="xs" icon="check" />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          )}
      </ListItem>
    );
  }
}

export default Competitor;
