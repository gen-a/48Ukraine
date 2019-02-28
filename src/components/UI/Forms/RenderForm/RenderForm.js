/**
 * RenderForm form component
 * Standard form render view
 * @module RenderForm
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes  = {
  /** true if the form data is the same as its initialized values. Opposite of dirty */
  isPristine: PropTypes.bool.isRequired,
  /** Whether or not your form is currently submitting.  */
  isSubmitting: PropTypes.bool.isRequired,
  /** Message type.  */
  messageType: PropTypes.string,
  /** Message.  */
  message: PropTypes.string,
  /** Renderable children fields */
  children: PropTypes.node.isRequired,
  /** Action connected to the form submission */
  onSubmit: PropTypes.func.isRequired,
  /** Resets all the values in the form to the initialized state, making it pristine again. */
  onReset: PropTypes.func.isRequired,
};

const defaultProps = {
  messageType: '',
  message: '',
};

const RenderForm = ({isPristine, isSubmitting, messageType, message, children, onSubmit, onReset}) =>{
  return (
    <form onSubmit={onSubmit}>
      {message && <strong>{message}</strong>}

      {children}

      <div>
        <button type="submit" disabled={isPristine}>Submit</button>
        <button type="button" disabled={isPristine || isSubmitting} onClick={onReset}>Clear Values</button>
      </div>
    </form>
  );
};

RenderForm.propTypes = propTypes;
RenderForm.defaultProps = defaultProps;


export default RenderForm;