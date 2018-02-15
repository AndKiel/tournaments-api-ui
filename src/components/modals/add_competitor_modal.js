import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
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
import styles from '../../styles/modals.scss';
import CompetitorForm from '../../forms/competitor_form';
import TextInput from '../forms/text_input';

@translate()
@inject('store')
@observer
class AddCompetitorModal extends Component {
  componentWillMount() {
    this.form = new CompetitorForm();
    this.form.submitImpl = this.submitImpl;
  }

  @autobind
  async submitImpl() {
    const tournament = this.props.store.tournamentsStore.item;
    await tournament.addCompetitor(this.form.values());
    this.props.store.uiStore.setAlert(this.props.t('alerts.competitor.create'));
    this.props.onClose();
  }

  render() {
    this.form.clear();

    const { t } = this.props;

    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <Card className={styles.contents}>
          <form onSubmit={this.form.onSubmit}>
            <CardContent>
              <Typography variant="headline">
                {t('components.modals.add_competitor.title')}
              </Typography>
              <TextInput
                field={this.form.$('competitor.name')}
                autoFocus
                required
              />
            </CardContent>
            <CardActions>
              <Button color="primary" style={{ flex: 1 }} type="submit">
                {t('common.buttons.submit')}
              </Button>
            </CardActions>
          </form>
        </Card>
      </Modal>
    );
  }
}

AddCompetitorModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default AddCompetitorModal;
