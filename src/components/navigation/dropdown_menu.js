import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import {
  ClickAwayListener,
  IconButton,
  Grow,
  MenuItem,
  MenuList,
  Paper
} from 'material-ui';
import { Manager, Target, Popper } from 'react-popper';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import routes from '../../utils/routes';
import styles from './dropdown_menu.scss';

@observer
class DropdownMenu extends Component {
  @observable isMenuOpen = false;

  @autobind
  openMenu() {
    this.isMenuOpen = true;
  }
  @autobind
  closeMenu() {
    this.isMenuOpen = false;
  }

  render() {
    return (
      <Manager className={styles['dropdown-menu']}>
        <Target>
          <IconButton color="contrast" onClick={this.openMenu}>
            <FontAwesomeIcon icon="bars" fixedWidth />
          </IconButton>
        </Target>
        <Popper
          placement="bottom-start"
          eventsEnabled={this.isMenuOpen}
          className={
            styles[`dropdown-list-${this.isMenuOpen ? 'open' : 'closed'}`]
          }
        >
          <ClickAwayListener onClickAway={this.closeMenu}>
            <Grow in={this.isMenuOpen} style={{ transformOrigin: '0 0 0' }}>
              <Paper>
                <MenuList>
                  <MenuItem
                    onClick={this.closeMenu}
                    component={Link}
                    to={routes.tournaments()}
                  >
                    All tournaments
                  </MenuItem>
                  <MenuItem
                    onClick={this.closeMenu}
                    component={Link}
                    to={routes.organisedTournaments()}
                  >
                    Organised tournaments
                  </MenuItem>
                  <MenuItem
                    onClick={this.closeMenu}
                    component={Link}
                    to={routes.attendedTournaments()}
                  >
                    Attended tournaments
                  </MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </Popper>
      </Manager>
    );
  }
}

export default DropdownMenu;
