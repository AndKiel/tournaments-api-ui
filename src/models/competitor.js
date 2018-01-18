import { types } from "mobx-state-tree"

const Competitor = types.model("Competitor", {
  id: types.identifier(types.string),
  name: types.string,
  status: types.enumeration(["enlisted", "confirmed"])
});

export default Competitor
