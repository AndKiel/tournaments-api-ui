import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import { Typography } from 'material-ui';

@inject('store')
@observer
class Round extends Component {
  render() {
    return <Typography>{this.props.round.toString()}</Typography>;
  }
}

export default Round;
