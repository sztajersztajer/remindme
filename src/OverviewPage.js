import React from 'react';
import { reduxForm, formValueSelector} from 'redux-form';
import { connect } from 'react-redux';

let OverviewPage = props => {
  const { previousPage, title, category, contractEndDate, noticePeriod } = props;
  return (
    <div>
    <p>Values</p>
    <p>Title: {title}</p>
    <p>Category: {category}</p>
    <p>contractEndDate: {contractEndDate}</p>
    <p>noticePeriod: {noticePeriod}</p>

    <button type="button" className="previous" onClick={previousPage}>
      Previous
    </button>
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
    const contractEndDate = selector(state, 'contractEndDate');
    const noticePeriod = selector(state, 'noticePeriod');

    return {
     title,
     category,
     contractEndDate,
     noticePeriod
    }
  }
)(OverviewPage)

export default OverviewPage;
