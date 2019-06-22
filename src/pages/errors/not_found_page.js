import React, { Component } from "react";
import { translate } from "react-i18next";
import { Grid, Typography } from "material-ui";

@translate()
class NotFoundPage extends Component {
  render() {
    const { t } = this.props;

    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography variant="headline" align="center">
            404
          </Typography>
          <Typography align="center">{t("pages.not_found.text")}</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default NotFoundPage;
