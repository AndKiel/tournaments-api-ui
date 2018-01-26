import React, { Component } from 'react';
import { observer } from 'mobx-react/index';
import { Card, CardContent, Typography } from 'material-ui';

@observer
class TournamentCard extends Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography type="title">{this.props.tournament.name}</Typography>
          <Typography>Starts at: {this.props.tournament.starts_at}</Typography>
          <Typography>
            Competitors limit: {this.props.tournament.competitors_limit}
          </Typography>
          <Typography>Status: {this.props.tournament.status}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default TournamentCard;
