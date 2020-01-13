import React, {Component} from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import { getCategories, getProvider } from './service';
import { connect } from 'react-redux';
import { Form, Message } from 'semantic-ui-react';

const normalizeCategories = categories => {
  return categories.map(category => {
    return { key: category.id, text: category.categoryName, value: category.id }  
  });
}

const normalizeProviders = providers => {
  return providers.map(provider => {
    return { key: provider.company.id, text: provider.company.companyName, value: provider.company.id }  
  });
}

const renderSelect = ({ input, options, label, placeholder, meta: { error, touched }, handleInternalChange }) => (
  <div>
    <Form.Select
      label={label}
      name={input.name}
      onChange={(e, { value }) => {
          handleInternalChange(value) 
          input.onChange(value)
        }
      }
      options={options}
      placeholder={placeholder}
      value={input.value}
    />
    {touched && error && <Message negative>{error}</Message>}
  </div>
);

const renderInput = ({ input, label, meta: { error, touched } }) => (
  <div>
    <Form.Input
      name={input.name}
      label={label}
    />
    {touched && error && <Message negative>{error}</Message>}
  </div>
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
          component={renderInput}
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
  form: 'wizard', 
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(WizardFormFirstPage));
