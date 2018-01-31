import React, { Component } from 'react';
import { Grid, Typography } from 'material-ui';

class NotFoundPage extends Component {
  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography type="headline" align="center">
            404
          </Typography>
          <Typography align="center">Page Not Found</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default NotFoundPage;
