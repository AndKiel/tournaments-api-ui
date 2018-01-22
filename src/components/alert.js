import React from 'react';
import { inject, observer } from 'mobx-react';
import { Paper, Typography } from 'material-ui';

const Alert = ({ store: { uiStore: { alertText, alertType } } }) => {
  if (alertText.length > 0) {
    return (
      <Paper classes={`alert alert-${alertType}`}>
        <Typography>{alertText}</Typography>
      </Paper>
    );
  } else return null;
};

export default inject('store')(observer(Alert));
