import React, { Component } from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react/index";
import { IconButton, Typography } from "material-ui";
import NewRoundButton from "./buttons/new_round_button";
import EditRoundButton from "./buttons/edit_round_button";
import AssignPlayersButton from "./buttons/assign_players_button";
import RemoveRoundButton from "./buttons/remove_round_button";
import Round from "./round";
import classNames from "classnames";
import styles from "./rounds_list.module.scss";

@inject("store")
@observer
class RoundsList extends Component {
  @observable currentRound = 0;

  render() {
    const tournament = this.props.store.tournamentsStore.item;
    const round = tournament.rounds[this.currentRound];
    const contentClasses = classNames(styles.main, {
      [styles["not-signed-in"]]: !this.props.store.sessionStore.isSignedIn
    });

    return (
      <div className={styles.container}>
        {tournament.isUserOrganiser && (
          <div className={styles.side}>
            <NewRoundButton />
            {round && (
              <div>
                <EditRoundButton round={round} />
                <AssignPlayersButton round={round} />
                <RemoveRoundButton round={round} />
              </div>
            )}
          </div>
        )}
        <div className={contentClasses}>
          <div className={styles.navigation}>
            {tournament.rounds.map((r, idx) => {
              const isCurrent = this.currentRound === idx;
              const buttonClasses = classNames(styles.button, {
                [styles.active]: isCurrent
              });

              return (
                <IconButton
                  key={idx}
                  className={buttonClasses}
                  disabled={isCurrent}
                  disableRipple
                  onClick={() => {
                    this.currentRound = idx;
                  }}
                >
                  <Typography>{idx + 1}</Typography>
                </IconButton>
              );
            })}
          </div>
          {round && <Round round={round} />}
        </div>
      </div>
    );
  }
}

export default RoundsList;
