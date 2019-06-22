import React, { Component } from "react";
import { translate } from "react-i18next";
import { inject, observer } from "mobx-react/index";
import {
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "material-ui";
import classNames from "classnames";
import styles from "./results_list.module.scss";

@translate()
@inject("store")
@observer
class ResultsList extends Component {
  componentWillMount() {
    this.props.store.tournamentsStore.item.getResults();
  }

  render() {
    const { t } = this.props;
    const tournament = this.props.store.tournamentsStore.item;

    return (
      <Grid container justify="center">
        <Grid item>
          <div className={styles.container}>
            <Table padding="dense">
              <TableHead>
                <TableRow>
                  <TableCell numeric>#</TableCell>
                  <TableCell>
                    {t("components.results.results_list.competitor")}
                  </TableCell>
                  {tournament.result_names.map((name, index) => {
                    return <TableCell key={index}>{name}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {tournament.results.map((result, idx) => {
                  const rowClasses = classNames({
                    [styles.gold]: idx === 0,
                    [styles.silver]: idx === 1,
                    [styles.bronze]: idx === 2
                  });

                  return (
                    <TableRow key={idx} className={rowClasses}>
                      <TableCell numeric>{idx + 1}</TableCell>
                      <TableCell>{result.competitor_id.name}</TableCell>
                      {result.total.map((value, index) => {
                        return (
                          <TableCell key={index} numeric>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default ResultsList;
