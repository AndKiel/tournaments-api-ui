import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

class Navigation extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            Tournaments
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navigation;
