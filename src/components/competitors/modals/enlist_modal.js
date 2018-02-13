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
import CompetitorForm from '../../../forms/competitor_form';
import TextInput from '../../forms/text_input';

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
      'You have successfully enlisted in a tournament.'
    );
    this.props.onClose();
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <Card className={styles.contents}>
          <form onSubmit={this.form.onSubmit}>
            <CardContent>
              <Typography variant="headline">Enlist</Typography>
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

EnlistModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default EnlistModal;
