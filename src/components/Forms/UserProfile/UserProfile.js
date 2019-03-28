/**
 * UserProfile - Redux form  Component.
 *
 * @see See [ReduxForm](https://redux-form.com/6.4.3) for more information about ReduxForm
 * @module UserProfile
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import RenderField from '../../UI/Forms/RenderField';
import RenderForm from '../../UI/Forms/RenderForm';
import { updateProfile } from '../../../actions/user';

import '../../../_grid.scss';
import '../Forms.scss';

/**
 * Validate all form fields and return object with invalid entries error messages
 * @param values {object} - form values
 * @returns {{}}
 */
const validate = (values) => {
  const errors = {};
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
  callUpdateProfile: PropTypes.func.isRequired,
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
 * UserProfile form container Component
 */
const UserProfile = ({
                       error,
                       callUpdateProfile,
                       handleSubmit,
                       pristine,
                       reset,
                       submitting,
                       invalid,
                       submitSucceeded
                     }) => {
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
      onSubmit={handleSubmit(callUpdateProfile)}
      onReset={reset}
      title="Has to be form title"
      message={message.text}
      messageType={message.type}
      submitLabel="Зберегти"
      resetLabel="Скинути"
    >

      <div className="Forms__fields">
        <div className="Forms__field xs-flex_100 md-flex_50 md-marginRight_50">
          <Field name="email" type="email" disabled component={RenderField} label="Електронна адреса"/>
        </div>
        <div className="Forms__field xs-flex_100 md-flex_50">
          <Field name="firstName" type="text" component={RenderField} label="Ім'я"/>
        </div>
        <div className="Forms__field xs-flex_100 md-flex_50">
          <Field name="lastName" type="text" component={RenderField} label="Прізвище"/>
        </div>
        <div className="Forms__field xs-flex_100 md-flex_50 md-marginRight_50">
          <Field name="phone" type="text" component={RenderField} label="Номер телефону"/>
        </div>
      </div>

    </RenderForm>
  );
};

UserProfile.propTypes = propTypes;
UserProfile.defaultProps = defaultProps;


const mapStateToProps = state => (
  {
    initialValues: state.user.profile
  }
);

const mapDispatchToProps = dispatch => (
  {
    callUpdateProfile: data => dispatch(updateProfile(data))
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'formUserProfile', validate
})(UserProfile));