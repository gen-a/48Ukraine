/**
 * UserPassword - Redux form  Component.
 *
 * @see See [ReduxForm](https://redux-form.com/6.4.3) for more information about ReduxForm
 * @module UserPassword
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import RenderField from '../../UI/Forms/RenderField';
import RenderForm from '../../UI/Forms/RenderForm';
import { updatePassword } from '../../../actions/user';
import { Switch } from '../../UI/MaterialUI';
import { password } from '../../../validation/validations';

import '../../../_grid.scss';
import '../Forms.scss';

/**
 * Validate all form fields and return object with invalid entries error messages
 * @param values {object} - form values
 * @returns {{}}
 */
/**
 * Validate all form fields and return object with invalid entries error messages
 * @param values {object} - form values
 * @returns {{}}
 */
const validate = (values) => {
  const errors = {};

  if (!password(values.password)) {
    errors.password = 'Has to be 6-12 characters length only letters or digits';
  }

  if (values.password !== values.passwordAgain) {
    errors.passwordAgain = 'Passwords does not match!';
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
  callUpdatePassword: PropTypes.func.isRequired,
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
 * UserPassword form container Component
 */
class UserPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  render() {
    const {
      error, callUpdatePassword, handleSubmit, pristine, reset, submitting, invalid, submitSucceeded
    } = this.props;

    const { isVisible } = this.state;


    let messageType = '';
    let message = '';

    if (error) {
      messageType = 'error';
      message = error;
    } else if (submitSucceeded) {
      messageType = 'success';
      message = 'Saved!!';
    } else if (submitting) {
      messageType = 'info';
      message = 'Submitting...';
    }

    return (
      <RenderForm
        error={error}
        isSubmitting={submitting}
        isPristine={pristine}
        isSucceeded={submitSucceeded}
        isInvalid={invalid}
        onSubmit={handleSubmit(callUpdatePassword)}
        onReset={reset}
        title="Has to be form title"
        message={message}
        messageType={messageType}
        submitLabel="Submit data"
        resetLabel="Reset form"
      >

        <div className="Forms__fields">
          <div className="Forms__field xs-flex_100 md-flex_50">
            <Field
              name="password"
              type={isVisible ? 'text' : 'password'}
              component={RenderField}
              label="Password"
            />
          </div>
          <div className="Forms__field xs-flex_100 md-flex_50">
            <Field
              name="passwordAgain"
              type={isVisible ? 'text' : 'password'}
              component={RenderField}
              label="Password again"
            />
          </div>
          <div className="Forms__field xs-flex_100">
          <Switch
            onChange={() => this.setState({ ...this.state, isVisible: !isVisible })}
            checked={isVisible}
            label="Show/hide password"
          />
          </div>
        </div>
      </RenderForm>
    );
  }
}


UserPassword.propTypes = propTypes;
UserPassword.defaultProps = defaultProps;


const mapStateToProps = state => (
  {
    initialValues: state.user.profile
  }
);

const mapDispatchToProps = dispatch => (
  {
    callUpdatePassword: data => dispatch(updatePassword(data))
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'formUserPassword', validate
})(UserPassword));