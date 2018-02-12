import React from 'react';
import { inject, observer } from 'mobx-react';
import { Fade, Snackbar, SnackbarContent } from 'material-ui';
import classNames from 'classnames';
import styles from './alert.scss';

const Alert = ({
  store: { uiStore: { alertText, alertType, isAlertOpen } }
}) => {
  const alertClasses = classNames({
    [styles['alert-error']]: alertType === 'error',
    [styles['alert-success']]: alertType === 'success'
  });

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transition={Fade}
      open={isAlertOpen}
    >
      <SnackbarContent className={alertClasses} message={alertText} />
    </Snackbar>
  );
};

export default inject('store')(observer(Alert));
