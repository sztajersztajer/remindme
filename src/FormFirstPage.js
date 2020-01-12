import React, {Component} from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import { getCategories, getProvider } from './service';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';

const normalizeCategories = categories => {
  let mapped =categories.map(category => {
    return { key: category.id, text: category.categoryName, value: category.id }  
  });
  return mapped;
}

const normalizeProviders = providers => {
  let mapped = providers.map(provider => {
    return { key: provider.company.id, text: provider.company.companyName, value: provider.company.id }  
  });
  return mapped
}

const renderSelect = field => (
  <Form.Select
    label={field.label}
    name={field.input.name}
    onChange={(e, { value }) => {
        field.handleInternalChange(value) 
        field.input.onChange(value)
      }
    }
    options={field.options}
    placeholder={field.placeholder}
    value={field.input.value}
  />
);

class WizardFormFirstPage extends Component {

  state = { categories: [], providers: []};
  
  constructor(props) {
    super(props)
    getCategories().then(data => this.setState({categories: data}));
    
    if(this.props.category !== undefined) {
      getProvider(this.props.category).then(data=> this.setState({providers: data}))
    }
  }

  handleCategorychange = value => {
    getProvider(value).then(data => this.setState({providers: data}))
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Field
          component={renderSelect}
          label="Category"
          name="category"
          options={normalizeCategories(this.state.categories)}
          placeholder="Category"
          handleInternalChange={this.handleCategorychange}
        />
        <Field
          component={renderSelect}
          label="Provider"
          name="provider"
          options={normalizeProviders(this.state.providers)}
          placeholder="Provider"
          handleInternalChange={() => {}}
        />
        <Field
          component={Form.Input}
          name="title"
          label="Title"
        />
        <Field
          name="contractEndDate"
          type="text"
          component={Form.Input}
          label="Contract End Date"
        />
        <Field
          name="noticePeriod"
          type="text"
          component={Form.Input}
          label="Notice Period"
        />
        <Form.Group inline>
          <Form.Button primary type="submit">Submit</Form.Button>
        </Form.Group>
      </Form>
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
