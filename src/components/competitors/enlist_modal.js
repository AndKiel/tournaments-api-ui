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
import styles from './enlist_modal.scss';
import CompetitorForm from '../../forms/competitor_form';
import TextInput from '../forms/text_input';

@inject('store')
@observer
class EnlistModal extends Component {
  componentWillMount() {
    this.form = new CompetitorForm();
    this.form.submitImpl = this.submitImpl;
  }

  @autobind
  async submitImpl() {
    const tournament = this.props.store.tournamentsStore.item;
    await tournament.enlist(this.form.values());
    this.props.store.uiStore.setAlert(
      'success',
      'You have successfully enlisted in a tournament.'
    );
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <Card className={styles.contents}>
          <form onSubmit={this.form.onSubmit}>
            <CardContent>
              <Typography type="headline">Enlist</Typography>
              <TextInput
                field={this.form.$('competitor.name')}
                autoFocus
                required
              />
            </CardContent>
            <CardActions>
              <Button color="primary" style={{ flex: 1 }} type="submit">
                Submit
              </Button>
            </CardActions>
          </form>
        </Card>
      </Modal>
    );
  }
}

export default EnlistModal;
