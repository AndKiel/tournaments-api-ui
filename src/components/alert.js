import React from 'react';
import { inject, observer } from 'mobx-react';
import { Paper, Typography } from 'material-ui';

const Alert = ({ store: { uiStore: { alert_text, alert_type } } }) => {
  if (alert_text.length > 0) {
    return (
      <Paper classes={`alert alert-${alert_type}`}>
        <Typography>{alert_text}</Typography>
      </Paper>
    );
  } else return null;
};

export default inject('store')(observer(Alert));
