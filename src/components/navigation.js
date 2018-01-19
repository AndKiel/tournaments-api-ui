import React, { Component } from 'react';
import { AppBar, Button, Toolbar, Typography } from 'material-ui';
import { Link } from 'react-router-dom';
import routes from '../utils/routes';

class Navigation extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" style={{ flex: 1 }}>
            Tournaments
          </Typography>
          <Button color="contrast" component={Link} to={routes.signIn()}>
            Sign in
          </Button>
          <Button color="contrast" component={Link} to={routes.signUp()}>
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navigation;
