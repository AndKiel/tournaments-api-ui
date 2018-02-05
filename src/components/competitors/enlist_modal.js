import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { Card, CardContent, Modal, Typography } from 'material-ui';
import styles from './enlist_modal.scss';

@inject('store')
@observer
class EnlistModal extends Component {
  @autobind
  async enlist() {}

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <Card className={styles.contents}>
          <CardContent>
            <Typography>Enlist modal placeholder</Typography>
          </CardContent>
        </Card>
      </Modal>
    );
  }
}

export default EnlistModal;
