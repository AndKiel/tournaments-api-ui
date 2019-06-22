import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react/index";
import { Grid } from "material-ui";
import PlayersTable from "./players_table";
import groupBy from "lodash/groupBy";

@observer
class CompetitorsList extends Component {
  render() {
    const groupedPlayers = groupBy(this.props.players, "table_number");

    return (
      <Grid container justify="center">
        {Object.entries(groupedPlayers).map(pair => {
          return (
            <Grid item key={pair[0]}>
              <PlayersTable number={pair[0]} players={pair[1]} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

CompetitorsList.propTypes = {
  players: PropTypes.object.isRequired
};

export default CompetitorsList;
