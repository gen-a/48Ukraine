/**
 * Checkout - Redux form  Component.
 *
 * @see See [ReduxForm](https://redux-form.com/6.4.3) for more information about ReduxForm
 * @module Checkout
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import RenderField from '../../UI/Forms/RenderField';
import RenderForm from '../../UI/Forms/RenderForm';
import {email} from '../../../validation/validations';
import {checkout} from '../../../actions/cart';


import '../../../_grid.scss';
import '../Forms.scss';

/**
 * Validate all form fields and return object with invalid entries error messages
 * @param values {object} - form values
 * @returns {{}}
 */
const validate = (values) => {
  const errors = {};
  const required =
    { email: 'E-mail is required',
      firstName: 'First Name is required',
      lastName: 'Last Name is required',
      phone: 'Phone is required',
      toFirstName: 'to First Name is required',
      toLastName: 'to Last Name is required',
      toAddress: 'to Address is required',
      toZip: 'to Zip is required',
      toCity: 'to City is required',
      toPhone: 'to Phone is required',
      cardCvs: 'card Cvs is required',
      cardExp: 'card Exp is required',
      cardNumber: 'card Number is required'
    };
  Object.keys(required).forEach( k =>{
    if( !values[k] ){
      errors[k] = required[k];
    }
  });
  if(!email(values.email)){
    errors.email = 'Not valid E-mail address';
  }
  return errors;
};

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** A function meant to be passed to onSubmit={handleSubmit} or to onClick={handleSubmit} */
  handleSubmit: PropTypes.func.isRequired,
  /** Action connected to the form submission */
  callCheckout: PropTypes.func.isRequired,
  /** A generic error for the entire form given by the _error key */
  error: PropTypes.string,
  /** true if the form data is the same as its initialized values. Opposite of dirty. */
  pristine: PropTypes.bool,
  /** Resets all the values in the form to the initialized state, making it pristine again. */
  reset: PropTypes.func.isRequired,
  /** Whether or not your form is currently submitting */
  submitting: PropTypes.bool,
  /** true if the form has validation errors. Opposite of valid. */
  invalid: PropTypes.bool,
  /** If onSubmit is called, and succeed to submit , submitSucceeded will be set to true. */
  submitSucceeded: PropTypes.bool,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  error: '',
  pristine: true,
  submitting: false,
  invalid: false,
  submitSucceeded: false
};


/**
 * Checkout form container Component
 */
class Checkout extends Component {


  render() {
    const {
      error,
      callCheckout,
      handleSubmit,
      pristine,
      reset,
      submitting,
      invalid,
      submitSucceeded
    } = this.props;

    const message = {};
/*
    if (error) {
      message.type = 'error';
      message.text = error;
    } else if (submitSucceeded) {
      message.type = 'success';
      message.text = 'Saved!!';
    } else if (submitting) {
      message.type = 'info';
      message.text = 'Submitting...';
    }
*/

    return (
      <RenderForm
        error={error}
        isSubmitting={submitting}
        isPristine={pristine}
        isSucceeded={submitSucceeded}
        isInvalid={invalid}
        onSubmit={handleSubmit(callCheckout)}
        onReset={reset}
        title="Has to be form title"
        message={message.text}
        messageType={message.type}
        submitLabel="Submit data"
        resetLabel="Reset form"
      >
        <div className="Forms__fields Forms__fields_outlined">

          <h2 className="Forms__sectionTitle">Sender data</h2>

          <div className="Forms__field xs-flex_100 md-flex_50 md-marginRight_50">
            <Field name="email" type="email" component={RenderField} label="Email"/>
          </div>
          <div className="Forms__field xs-flex_100 md-flex_50">
            <Field name="firstName" type="text" component={RenderField} label="First Name"/>
          </div>
          <div className="Forms__field xs-flex_100 md-flex_50">
            <Field name="lastName" type="text" component={RenderField} label="Last Name"/>
          </div>
          <div className="Forms__field xs-flex_100 md-flex_50 md-marginRight_50">
            <Field name="phone" type="text" component={RenderField} label="Phone"/>
          </div>
        </div>


        <div className="Forms__fields Forms__fields_outlined">
          <h2 className="Forms__sectionTitle">Addressee data</h2>

          <div className="Forms__field xs-flex_100 md-flex_50">
            <Field name="toFirstName" type="text" component={RenderField} label="To First Name"/>
          </div>
          <div className="Forms__field xs-flex_100 md-flex_50">
            <Field name="toLastName" type="text" component={RenderField} label="To Last Name"/>
          </div>

          <div className="Forms__field xs-flex_100">
            <Field name="toAddress" type="text" component={RenderField} label="toAddress"/>
          </div>

          <div className="Forms__field xs-flex_50">
            <Field name="toZip" type="text" component={RenderField} label="toZip"/>
          </div>

          <div className="Forms__field xs-flex_50">
            <Field name="toCity" type="text" component={RenderField} label="toCity"/>
          </div>

          <div className="Forms__field xs-flex_100 md-flex_50 md-marginRight_50">
            <Field name="toPhone" type="text" component={RenderField} label="toPhone"/>
          </div>
        </div>


        <div className="Forms__fields Forms__fields_outlined">
          <h2 className="Forms__sectionTitle">Payment details</h2>
          <div className="Forms__field xs-flex_100 md-flex_50">
            <Field name="cardNumber" type="text" component={RenderField} label="cardNumber"/>
          </div>
          <div className="Forms__field xs-flex_50 md-flex_25">
            <Field name="cardExp" type="text" component={RenderField} label="cardExp"/>
          </div>
          <div className="Forms__field xs-flex_50 md-flex_25">
            <Field name="cardCvs" type="password" component={RenderField} label="cardCvs"/>
          </div>
        </div>
      </RenderForm>
    );
  }
}

Checkout.propTypes = propTypes;
Checkout.defaultProps = defaultProps;


const mapStateToProps = state => (
  {
    initialValues: state.user.profile
  }
);

const mapDispatchToProps = dispatch => (
  {
    callCheckout: data => dispatch(checkout(data))
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'formCheckout', validate
})(Checkout));
