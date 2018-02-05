import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import { Card, CardContent, Typography } from 'material-ui';

@inject('store')
@observer
class CompetitorsList extends Component {
  render() {
    const tournament = this.props.store.tournamentsStore.item;

    return (
      <Card>
        <CardContent>
          <Typography type="title">
            {`Competitors (${tournament.competitorsCount}/${
              tournament.competitors_limit
            })`}
          </Typography>
          <Typography>Competitors list placeholder</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default CompetitorsList;
