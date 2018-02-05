import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import {
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

@inject('store')
@observer
class Competitor extends Component {
  @autobind
  async confirmCompetitor() {}

  render() {
    const { name, status } = this.props.competitor;

    return (
      <ListItem>
        <ListItemText primary={name} />
        {status === 'enlisted' && (
          <ListItemSecondaryAction>
            <IconButton>
              <FontAwesomeIcon icon="check" onClick={this.confirmCompetitor} />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}

export default Competitor;
