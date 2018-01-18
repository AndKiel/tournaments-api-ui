const apiRoutes = {
  signUpUsers: () => '/users/sign_up',

  oauthToken: () => '/oauth/token',
  oauthTokenInfo: () => '/oauth/token/info',
  oauthRevoke: () => '/oauth/revoke',

  user: () => '/user',

  tournaments: () => '/tournaments',
  enlistedTournaments: () => '/tournaments/enlisted',
  tournament: id => `/tournaments/${id}`,
  startTournament: id => `/tournaments/${id}/start`,
  endTournament: id => `/tournaments/${id}/end`,

  competitor: () => '/competitor',
  confirmCompetitor: id => `/competitors/${id}/confirm`,

  rounds: () => '/rounds',
  round: id => `/rounds/${id}`,

  players: () => '/players',
  player: id => `/players/${id}`
};

export default apiRoutes;
