import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { inject, observer } from 'mobx-react/index';
import { Typography } from 'material-ui';
import TableList from '../players/table_list';
import styles from './round.module.scss';

@translate()
@inject('store')
@observer
class Round extends Component {
  render() {
    const { t, round } = this.props;
    const tournament = this.props.store.tournamentsStore.item;

    return (
      <div>
        <div className={styles.summary}>
          <Typography align="center">
            {t('components.rounds.round.competitors', {
              count: round.competitors_limit
            })}
          </Typography>
          <Typography align="center" paragraph>
            {t('components.rounds.round.tables', { count: round.tables_count })}
          </Typography>
          {tournament.isUserOrganiser &&
            tournament.status === 'in_progress' && (
              <Typography align="center" paragraph>
                {t('components.rounds.round.help')}
              </Typography>
            )}
        </div>
        <TableList players={round.players} />
      </div>
    );
  }
}

Round.propTypes = {
  round: PropTypes.object.isRequired
};

export default Round;
