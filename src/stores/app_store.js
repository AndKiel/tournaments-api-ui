import { types } from "mobx-state-tree";
import SessionStore from "./session_store";
import UIStore from "./ui_store";
import UserStore from "./user_store";
import FilterStore from "./filter_store";
import TournamentsStore from "./tournaments_store";
import OrganisedTournamentsStore from "./organised_tournaments_store";
import EnlistedTournamentsStore from "./enlisted_tournaments_store";

const AppStore = types.model("AppStore", {
  sessionStore: types.optional(SessionStore, {}),
  uiStore: types.optional(UIStore, {}),
  userStore: types.optional(UserStore, {}),
  filterStore: types.optional(FilterStore, {}),
  tournamentsStore: types.optional(TournamentsStore, {}),
  organisedTournamentsStore: types.optional(OrganisedTournamentsStore, {}),
  enlistedTournamentsStore: types.optional(EnlistedTournamentsStore, {})
});

export default AppStore;
