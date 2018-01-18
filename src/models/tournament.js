import { types } from "mobx-state-tree"
import Competitor from "./competitor"
import Round from "./round"

const Tournament = types.model("Tournament", {
  id: types.identifier(types.string),
  competitors_limit: types.number,
  description: types.string,
  name: types.string,
  result_names: types.array(types.string),
  starts_at: types.Date,
  status: types.enumeration(["created", "in_progress", "ended"]),
  competitors: types.maybe(types.array(Competitor)),
  rounds: types.maybe(types.array(Round))
});

export default Tournament
