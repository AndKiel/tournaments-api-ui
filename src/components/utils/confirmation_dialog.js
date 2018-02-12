import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from 'material-ui';

@observer
class ConfirmationDialog extends Component {
  @autobind
  confirm() {
    this.props.onConfirm();
    this.props.onClose();
  }

  render() {
    const { open, onClose, title, text } = this.props;

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        {text && (
          <DialogContent>
            <DialogContentText>{text}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            No
          </Button>
          <Button color="primary" onClick={this.confirm} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  text: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default ConfirmationDialog;
