import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography
} from 'material-ui';
import styles from '../../../styles/modals.scss';
import RoundForm from '../../../forms/round_form';
import TextInput from '../../forms/text_input';

@inject('store')
@observer
class NewRoundModal extends Component {
  componentWillMount() {
    this.form = new RoundForm();
    this.form.submitImpl = this.submitImpl;
  }

  @autobind
  async submitImpl() {
    const tournament = this.props.store.tournamentsStore.item;
    await tournament.addRound(this.form.values());
    this.props.store.uiStore.setAlert(
      'You have successfully added a round to a tournament.'
    );
    this.props.onClose();
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <Card className={styles.contents}>
          <form onSubmit={this.form.onSubmit}>
            <CardContent>
              <Typography type="headline">New round</Typography>
              <TextInput
                field={this.form.$('round.competitors_limit')}
                type="number"
                autoFocus
                required
              />
              <TextInput
                field={this.form.$('round.tables_count')}
                type="number"
                required
              />
            </CardContent>
            <CardActions>
              <Button color="primary" style={{ flex: 1 }} type="submit">
                Create
              </Button>
            </CardActions>
          </form>
        </Card>
      </Modal>
    );
  }
}

NewRoundModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default NewRoundModal;
