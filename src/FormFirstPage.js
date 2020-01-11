import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];
const renderColorSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Select a color...</option>
      {colors.map(val => <option value={val} key={val}>{val}</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

const WizardFormFirstPage = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label>Favorite Color</label>
      <Field name="favoriteColor" component={renderColorSelector} />
      <Field
        name="title"
        type="text"
        component={renderField}
        label="Title"
      />
      <Field
        name="category"
        type="text"
        component={renderField}
        label="Category"
      />
      <Field
        name="contractEndDate"
        type="text"
        component={renderField}
        label="Contract End Date"
      />
      <Field
        name="noticePeriod"
        type="text"
        component={renderField}
        label="Notice Period"
      />
      <div>
        <button type="submit" className="next">Next</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardFormFirstPage);
