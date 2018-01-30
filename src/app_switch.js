import React, { Component } from 'react';
import { inject } from 'mobx-react/index';
import { Switch, Redirect, Route } from 'react-router-dom';
import AuthenticatedRoute from './utils/authenticated_route';

import SignInPage from './pages/sign_in_page';
import SignUpPage from './pages/sign_up_page';
import AccountPage from './pages/account_page';
import OrganisedTournamentsPage from './pages/tournaments/organised_tournaments_page';
import EnlistedTournamentsPage from './pages/tournaments/enlisted_tournaments_page';
import NewTournamentPage from './pages/tournaments/new_tournament_page';
import TournamentsPage from './pages/tournaments/tournaments_page';
import TournamentPage from './pages/tournaments/tournament_page';
import NotFoundPage from './pages/not_found_page';

import routes from './utils/routes';

@inject('store')
class AppSwitch extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from={routes.root()} to={routes.tournaments()} />
        <Route path={routes.signIn()} component={SignInPage} />
        <Route path={routes.signUp()} component={SignUpPage} />
        <AuthenticatedRoute
          path={routes.account()}
          component={AccountPage}
          store={this.props.store}
        />
        <AuthenticatedRoute
          path={routes.organisedTournaments()}
          component={OrganisedTournamentsPage}
          store={this.props.store}
        />
        <AuthenticatedRoute
          path={routes.enlistedTournaments()}
          component={EnlistedTournamentsPage}
          store={this.props.store}
        />
        <AuthenticatedRoute
          path={routes.newTournament()}
          component={NewTournamentPage}
          store={this.props.store}
        />
        <Route path={routes.tournaments()} component={TournamentsPage} />
        <Route path={routes.tournament()} component={TournamentPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default AppSwitch;
