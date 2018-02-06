import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListItemIcon, ListItemText, MenuItem } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import routes from '../../../utils/routes';
import styles from './icons.scss';

class EditTournamentMenuItem extends Component {
  render() {
    const { id } = this.props.tournament;

    return (
      <MenuItem component={Link} to={routes.editTournament(id)}>
        <ListItemIcon>
          <FontAwesomeIcon
            className={styles['menu-icon']}
            icon="edit"
            fixedWidth
          />
        </ListItemIcon>
        <ListItemText primary="Edit" />
      </MenuItem>
    );
  }
}

export default EditTournamentMenuItem;
