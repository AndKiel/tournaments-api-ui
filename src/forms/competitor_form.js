import { Form } from "mobx-react-form";

class CompetitorForm extends Form {
  setup() {
    return {
      fields: ["competitor.name"]
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
              form.$(`competitor.${pair[0]}`).invalidate(pair[1].join(", "));
            }
          } else {
            throw error;
          }
        }
      }
    };
  }
}

export default CompetitorForm;
