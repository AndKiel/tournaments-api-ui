import { types } from "mobx-state-tree";

const AccessToken = types.model("AccessToken", {
  access_token: types.identifier(types.string),
  created_at: types.number,
  expires_in: types.number,
  refresh_token: types.string,
  token_type: types.enumeration(["Bearer"])
});

export default AccessToken;
