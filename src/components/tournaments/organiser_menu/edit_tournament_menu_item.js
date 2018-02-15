import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ListItemIcon, ListItemText, MenuItem } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import routes from '../../../utils/routes';
import styles from './icons.scss';

@translate()
class EditTournamentMenuItem extends Component {
  render() {
    const { t } = this.props;
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
        <ListItemText primary={t('common.buttons.edit')} />
      </MenuItem>
    );
  }
}

EditTournamentMenuItem.propTypes = {
  tournament: PropTypes.object.isRequired
};

export default EditTournamentMenuItem;
