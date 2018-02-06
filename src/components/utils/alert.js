import React from 'react';
import { inject, observer } from 'mobx-react';
import { Fade, Snackbar, SnackbarContent } from 'material-ui';
import styles from './alert.scss';

const Alert = ({
  store: { uiStore: { alertText, alertType, isAlertOpen } }
}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transition={Fade}
      open={isAlertOpen}
    >
      <SnackbarContent
        className={styles[`alert-${alertType}`]}
        message={alertText}
      />
    </Snackbar>
  );
};

export default inject('store')(observer(Alert));
