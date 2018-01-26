import React, { Component } from 'react';
import { observer } from 'mobx-react/index';
import { Card, CardContent, Typography } from 'material-ui';

@observer
class TournamentCard extends Component {
  render() {
    const {
      name,
      starts_at,
      competitors_limit,
      status
    } = this.props.tournament;

    return (
      <Card>
        <CardContent>
          <Typography type="title">{name}</Typography>
          <Typography>Starts at: {starts_at}</Typography>
          <Typography>Competitors limit: {competitors_limit}</Typography>
          <Typography>Status: {status}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default TournamentCard;
