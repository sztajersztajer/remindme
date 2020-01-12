import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector, reduxForm } from 'redux-form';
//import { getCategories, getProvider } from './service';
import { Button } from 'semantic-ui-react';

let OverviewPage = props => {
  console.log(props)
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

OverviewPage = reduxForm({
  form: 'wizard', 
  destroyOnUnmount: false, 
  forceUnregisterOnUnmount: true,
})(OverviewPage);

const selector = formValueSelector('wizard')

OverviewPage = connect(
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
)(OverviewPage)

export default OverviewPage;
