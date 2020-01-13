const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.category) {
    errors.category = 'Required';
  }
  if (!values.provider) {
    errors.provider = 'Required';
  }
  if (!values.contractEndDate) {
    errors.lastName = 'Required';
  }
  return errors;
};

export default validate;
