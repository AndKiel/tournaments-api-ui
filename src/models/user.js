import { types } from "mobx-state-tree"

const User = types.model("User", {
  id: types.identifier(types.string),
  email: types.string
});

export default User
