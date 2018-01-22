import React from 'react';
import { inject, observer } from 'mobx-react';
import { Paper, Typography } from 'material-ui';
import styles from './alert.scss';

const Alert = ({ store: { uiStore: { alertText, alertType } } }) => {
  if (alertText.length > 0) {
    return (
      <Paper className={styles[`alert-${alertType}`]}>
        <Typography>{alertText}</Typography>
      </Paper>
    );
  } else return null;
};

export default inject('store')(observer(Alert));
