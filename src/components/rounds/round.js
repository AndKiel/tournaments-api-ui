import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import { Typography } from 'material-ui';
import TableList from '../players/table_list';
import styles from './round.scss';

@inject('store')
@observer
class Round extends Component {
  render() {
    const round = this.props.round;

    return (
      <div>
        <div className={styles.summary}>
          <Typography align="center">
            {round.competitors_limit} competitors
          </Typography>
          <Typography align="center">
            on {round.tables_count} table{round.tables_count > 1 ? 's' : ''}
          </Typography>
        </div>
        <TableList players={round.players} />
      </div>
    );
  }
}

export default Round;
