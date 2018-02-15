import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';
import { observable } from 'mobx';
import autobind from 'autobind-decorator';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormHelperText,
  Modal,
  TextField,
  Typography
} from 'material-ui';
import modalStyles from '../../styles/modals.scss';
import styles from './edit_results_modal.scss';

@inject('store')
@observer
class EditResultsModal extends Component {
  @observable resultValues = [];
  @observable error = null;

  componentWillMount() {
    const tournament = this.props.store.tournamentsStore.item;
    if (
      this.props.player.result_values.length === tournament.result_names.length
    ) {
      this.resultValues = this.props.player.result_values.map(value => {
        return value;
      });
    } else {
      this.resultValues = tournament.result_names.map(() => {
        return 0;
      });
    }
  }

  @autobind
  async onSubmit(e) {
    e.preventDefault();
    try {
      this.error = null;
      await this.props.player.update({
        player: { result_values: this.resultValues }
      });
      this.props.store.uiStore.setAlert(
        'You have successfully updated results.'
      );
      this.props.onClose();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.fields) {
        this.error = error.response.data.fields.result_values.join(', ');
      } else {
        throw error;
      }
    }
  }

  render() {
    const resultNames = this.props.store.tournamentsStore.item.result_names;

    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <Card className={modalStyles.contents}>
          <form onSubmit={this.onSubmit}>
            <CardContent>
              <Typography variant="headline">
                Results for {this.props.player.competitor_id.name}{' '}
              </Typography>
              {resultNames.map((name, index) => {
                return (
                  <TextField
                    key={index}
                    id={name}
                    name={name}
                    label={name}
                    value={this.resultValues[index]}
                    onChange={e => {
                      this.resultValues[index] = e.currentTarget.value;
                    }}
                    type="number"
                    margin="normal"
                    required
                    className={styles.input}
                  />
                );
              })}
              {this.error && (
                <FormHelperText className={styles.error} error>
                  {this.error}
                </FormHelperText>
              )}
            </CardContent>
            <CardActions>
              <Button color="primary" style={{ flex: 1 }} type="submit">
                Update
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
