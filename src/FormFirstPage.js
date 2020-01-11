import React, {Component} from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import { getCategories, getProvider } from './service';
import { connect } from 'react-redux';

const renderCategoriesSelector = ({ input, meta: { touched, error }, categories, handleInternalChange }) => (
  <div>
    <select {...input} 
      onChange={e => {
          input.onChange(e)
          handleInternalChange(e)
        }
      }
      >
      <option value="">Select a category</option>
      {categories.map(val => <option value={val.id} key={val.id}>{val.categoryName}</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

const renderProvidersSelector = ({ input, meta: { touched, error }, categories }) => (
  <div>
    <select {...input}>
      <option value="">Select provider</option>
      {categories.map(val => <option value={val.id} key={val.id}>{val.company.companyName}</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

class WizardFormFirstPage extends Component {

  state = { categories: [], providers: []};
  
  componentDidMount() {
    
    getCategories().then(data => this.setState({categories: data}));
    
    if(this.props.category !== undefined) {
      getProvider(this.props.category).then(data=> this.setState({providers: data}))
    }
  }

  handleCategorychange = e => {
    getProvider(e.target.value).then(data=> this.setState({providers: data}))
  }

  render() {
    console.log(this.props.category)
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <label>Category</label>
        <Field 
          name="category" 
          component={renderCategoriesSelector} 
          categories={this.state.categories}
          handleInternalChange={this.handleCategorychange}
        />
        <Field 
          name="provider" 
          component={renderProvidersSelector} 
          categories={this.state.providers}
        />
        <Field
          name="title"
          type="text"
          component={renderField}
          label="Title"
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
  }
};
const selector = formValueSelector('wizard') 

export default connect(
  state => {
    const category = selector(state, 'category');
    return {
     category
    }
  }

)(reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardFormFirstPage));
