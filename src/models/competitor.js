import { types, getEnv, flow } from "mobx-state-tree";
import moment from "moment";
import apiRoutes from "../utils/api_routes";

const Competitor = types
  .model("Competitor", {
    created_at: types.string,
    id: types.identifier(types.string),
    name: types.string,
    status: types.enumeration(["enlisted", "confirmed"]),
    user_id: types.maybe(types.string)
  })
  .views(self => {
    return {
      get parsedCreatedAt() {
        return moment(self.created_at);
      }
    };
  })
  .actions(self => {
    const { apiClient } = getEnv(self);

    return {
      confirm: flow(function* confirm() {
        yield apiClient.post(apiRoutes.confirmCompetitor(self.id), {
          authenticate: true
        });
        self.status = "confirmed";
      }),

      reject: flow(function* reject() {
        yield apiClient.post(apiRoutes.rejectCompetitor(self.id), {
          authenticate: true
        });
        self.status = "enlisted";
      })
    };
  });

export default Competitor;
