import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { observer } from "mobx-react/index";
import autobind from "autobind-decorator";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "material-ui";

@translate()
@observer
class ConfirmationDialog extends Component {
  @autobind
  confirm() {
    this.props.onConfirm();
    this.props.onClose();
  }

  render() {
    const { t, action, open, onClose } = this.props;
    const title = t(`dialogs.${action}.title`);
    const text = t(`dialogs.${action}.text`);

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        {!text.includes(action) && (
          <DialogContent>
            <DialogContentText>{text}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            {t("common.buttons.no")}
          </Button>
          <Button color="primary" onClick={this.confirm} autoFocus>
            {t("common.buttons.yes")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmationDialog.propTypes = {
  action: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default ConfirmationDialog;
