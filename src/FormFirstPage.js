import React, {Component} from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import { getCategories, getProvider } from './service';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { inputField, selectField } from './components/wrappedFormControls';

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
          component={selectField}
          label="Category"
          name="category"
          options={normalizeCategories(this.state.categories)}
          placeholder="Category"
          handleInternalChange={this.handleCategorychange}
        />
        <Field
          component={selectField}
          label="Provider"
          name="provider"
          options={normalizeProviders(this.state.providers)}
          placeholder="Provider"
          handleInternalChange={() => {}}
        />
        <Field
          component={inputField}
          name="title"
          label="Title"
        />
        <Field
          name="contractEndDate"
          type="text"
          component={inputField}
          label="Contract End Date"
        />
        <Field
          name="noticePeriod"
          type="text"
          component={inputField}
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
