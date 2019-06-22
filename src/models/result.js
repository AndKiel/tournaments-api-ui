import { types } from "mobx-state-tree";
import Competitor from "./competitor";

const Result = types.model("Result", {
  competitor_id: types.reference(Competitor),
  total: types.array(types.number)
});

export default Result;
