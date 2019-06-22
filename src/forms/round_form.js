import { Form } from "mobx-react-form";

class RoundForm extends Form {
  setup() {
    return {
      fields: ["round.competitors_limit", "round.tables_count"]
    };
  }

  hooks() {
    return {
      async onSubmit(form) {
        try {
          form.validate();
          await form.submitImpl();
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.fields
          ) {
            for (let pair of Object.entries(error.response.data.fields)) {
              form.$(`round.${pair[0]}`).invalidate(pair[1].join(", "));
            }
          } else {
            throw error;
          }
        }
      }
    };
  }
}

export default RoundForm;
