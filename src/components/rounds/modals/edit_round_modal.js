import React, { Component } from 'react';
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
class EditRoundModal extends Component {
  componentWillMount() {
    this.form = new RoundForm();
    this.form.submitImpl = this.submitImpl;
    this.form.set({ round: this.props.round });
  }

  @autobind
  async submitImpl() {
    await this.props.round.update(this.form.values());
    this.props.store.uiStore.setAlert('You have successfully updated a round.');
    this.props.onClose();
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <Card className={styles.contents}>
          <form onSubmit={this.form.onSubmit}>
            <CardContent>
              <Typography type="headline">Edit round</Typography>
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
                Update
              </Button>
            </CardActions>
          </form>
        </Card>
      </Modal>
    );
  }
}

export default EditRoundModal;
