import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector, reduxForm } from 'redux-form';
//import { getCategories, getProvider } from './service'; //TODO get the option names for these uuid values
import { Button } from 'semantic-ui-react';

function OverviewPage(props) {
  const { previousPage, title, category, provider, contractEndDate, noticePeriod } = props;
  return (
    <div>
      <p>Values</p>
      <p>Title: {title}</p>
      <p>Category: {category}</p>
      <p>Provider: {provider}</p>
      <p>contractEndDate: {contractEndDate}</p>
      <p>noticePeriod: {noticePeriod}</p>

      <Button onClick={previousPage}>Back</Button>
    </div>  
  );
};

const selector = formValueSelector('wizard')

export default connect(
  state => {
    const title = selector(state, 'title');
    const category = selector(state, 'category');
    const provider = selector(state, 'provider');
    const contractEndDate = selector(state, 'contractEndDate');
    const noticePeriod = selector(state, 'noticePeriod');

    return {
      title,
      category,
      provider,
      contractEndDate,
      noticePeriod
    }
  }
)(reduxForm({
  form: 'wizard', 
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(OverviewPage));
