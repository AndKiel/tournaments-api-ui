import { types } from "mobx-state-tree"
import Competitor from "./competitor"

const Player = types.model("Player", {
  id: types.identifier(types.string),
  competitor_id: types.reference(Competitor),
  result_values: types.array(types.number),
  table_number: types.number
});

export default Player
