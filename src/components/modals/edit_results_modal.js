import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { inject, observer } from "mobx-react/index";
import autobind from "autobind-decorator";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormHelperText,
  Modal,
  TextField,
  Typography
} from "material-ui";
import PlayerForm from "../../forms/player_form";
import modalStyles from "../../styles/modals.module.scss";
import styles from "./edit_results_modal.module.scss";

@translate()
@inject("store")
@observer
class EditResultsModal extends Component {
  componentWillMount() {
    const resultNames = this.props.store.tournamentsStore.item.result_names;
    const resultValues =
      this.props.player.result_values.length === resultNames.length
        ? this.props.player.result_values.map(val => {
            return val;
          })
        : resultNames.map(() => {
            return 0;
          });

    this.form = new PlayerForm();
    this.form.submitImpl = this.submitImpl;
    this.form.set({
      player: {
        result_values: resultValues
      }
    });
  }

  @autobind
  async submitImpl() {
    const data = this.form.values();
    data.player.result_values = data.player.result_values.map(value => parseInt(value, 10));
    await this.props.player.update(data);
    this.props.store.uiStore.setAlert(this.props.t("alerts.result.update"));
    this.props.onClose();
  }

  render() {
    const { t } = this.props;
    const resultNames = this.props.store.tournamentsStore.item.result_names;
    const field = this.form.$("player.result_values");

    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <Card className={modalStyles.contents}>
          <form onSubmit={this.form.onSubmit}>
            <CardContent>
              <Typography variant="headline">
                {t("components.modals.edit_results.title", {
                  name: this.props.player.competitor_id.name
                })}
              </Typography>
              {field.value.map((value, index) => {
                const name = resultNames[index];

                return (
                  <TextField
                    key={index}
                    id={name}
                    name={name}
                    label={name}
                    value={value}
                    onChange={e => {
                      const array = field.value;
                      array[index] = e.currentTarget.value;
                      field.set(array);
                    }}
                    type="number"
                    margin="normal"
                    required
                    className={styles.input}
                  />
                );
              })}
              {field.hasError && (
                <FormHelperText className={styles.error} error>
                  {field.error}
                </FormHelperText>
              )}
            </CardContent>
            <CardActions>
              <Button color="primary" style={{ flex: 1 }} type="submit">
                {t("common.buttons.update")}
              </Button>
            </CardActions>
          </form>
        </Card>
      </Modal>
    );
  }
}

EditResultsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  player: PropTypes.object.isRequired
};

export default EditResultsModal;
