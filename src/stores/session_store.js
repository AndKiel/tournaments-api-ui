import { types, getEnv, getRoot, flow } from "mobx-state-tree";
import apiRoutes from "../utils/api_routes";

const SessionStore = types
  .model("SessionStore", {
    state: types.optional(
      types.enumeration(["initial", "loading", "ready"]),
      "initial"
    )
  })
  .views(self => {
    return {
      get isSignedIn() {
        return self.state === "ready" && getRoot(self).userStore.user;
      }
    };
  })
  .actions(self => {
    const { apiClient } = getEnv(self);

    return {
      setup: flow(function* setup() {
        self.state = "loading";
        if (apiClient.hasToken()) {
          yield getRoot(self).userStore.getUser();
        }
        self.state = "ready";
      }),

      signUp: flow(function* signUp(data) {
        return yield apiClient.post(apiRoutes.signUpUsers(), { data: data });
      }),

      signIn: flow(function* signIn({ email, password }) {
        yield apiClient.requestToken(email, password);
        self.state = "loading";
        yield getRoot(self).userStore.getUser();
        self.state = "ready";
      }),

      signOut: flow(function* signOut() {
        yield apiClient.revokeToken();
        getRoot(self).userStore.nullifyUser();
      })
    };
  });

export default SessionStore;
