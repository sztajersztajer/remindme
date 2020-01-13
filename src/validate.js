const validate = values => {
  const errors = {};

  if (!values.category) {
    errors.category = 'Category Required';
  }
  if (!values.provider) {
    errors.provider = 'Provider Required';
  }
  if (!values.title) {
    errors.title = 'Title Required';
  }
  if (!values.contractEndDate) {
    errors.contractEndDate = 'Contract End Date Required';
  }
  return errors;
};

export default validate;
