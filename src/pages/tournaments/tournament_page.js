import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import { Typography } from 'material-ui';

@inject('store')
@observer
class TournamentPage extends Component {
  componentWillMount() {
    //  TODO: get tournament from the api
  }

  render() {
    return (
      <div>
        <Typography type="headline">
          Tournament {this.props.match.params.id}
        </Typography>
      </div>
    );
  }
}

export default TournamentPage;
