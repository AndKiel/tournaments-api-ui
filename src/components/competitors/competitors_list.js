import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import { Card, CardContent, CardHeader, Typography } from 'material-ui';

@inject('store')
@observer
class CompetitorsList extends Component {
  render() {
    const tournament = this.props.store.tournamentsStore.item;

    return (
      <Card>
        <CardHeader
          title={`Competitors (${tournament.competitorsCount}/${
            tournament.competitors_limit
          })`}
        />
        <CardContent>
          <Typography>Competitors list placeholder</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default CompetitorsList;
