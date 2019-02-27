/**
 * AuthenticationForm Component.
 * Placeholder fot the description
 * @module AuthenticationForm
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RenderField from '../../UI/Forms/RenderField' ;
import RenderCheckbox from '../../UI/Forms/RenderCheckbox' ;
import { email as validateEmail } from '../../../validation/validations' ;

import './AuthenticationForm.scss';
import RenderButton from "../../UI/Forms/RenderButton/RenderButton";

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Text message of the toast. */
  //prop: PropTypes.string,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  //prop: '',
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class AuthenticationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formAction: 'email',
      fields: {
        email: {
          valid: false,
          error: '',
          value: '',
          busy: false,
          readOnly: false
        },
        password: {
          error: '',
          value: '',
          type: 'password'
        },
        showPassword: {
          value: false,
        }
      },
    };
  }

  checkEmailForNextAction() {
    this.setState(prevState => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        email: {
          ...prevState.fields.email,
          busy: true,
          readOnly: true
        }
      }
    }));

    setTimeout(() => {
      this.setState(prevState => ({
        ...prevState,
        formAction: 'login',
        fields: {
          ...prevState.fields,
          email: {
            ...prevState.fields.email,
            busy: false
          }
        }
      }));
    }, 2000);
  }

  onInputEmailBlur() {
    const { fields: { email: { value } } } = this.state;
    const valid = validateEmail(value);
    this.setState(prevState => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        email: {
          ...prevState.fields.email,
          error: value.length === 0 || valid ? '' : 'Invalid e-mail address',
          valid
        }
      }
    }));
  }

  onInputEmailFocus() {
    this.setState(prevState => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        email: {
          ...prevState.fields.email,
          error: ''
        }
      }
    }));
  }

  onInputEmailChange(value) {
    this.setState(prevState => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        email: {
          ...prevState.fields.email,
          value
        }
      }
    }));
  }


  onInputPasswordChange(value) {
    this.setState(prevState => (
      this.updateObject(prevState, ['fields', 'password', 'value'], value)
    ));
  }

  onInputShowPasswordChange() {
    const { fields: { showPassword: { value } } } = this.state;
    this.setState(prevState => (
      this.updateObject(
        this.updateObject(prevState, ['fields', 'showPassword', 'value'], !value),
        ['fields', 'password', 'type'], !value ? 'text' : 'password'
      )
    ));
  }

  updateObject(object, path, value) {
    const key = path.shift();
    return {
      ...object,
      [key]: path.length > 0 ? this.updateObject(object[key], path, value) : value
    };
  }

  render() {
    const { fields: { email, password, showPassword }, formAction } = this.state;
    return (
      <div className="AuthenticationForm">
        <h2>Authentication</h2>

        <RenderField
          input={{
            onBlur: () => this.onInputEmailBlur(),
            onFocus: () => this.onInputEmailFocus(),
            onChange: e => this.onInputEmailChange(e.currentTarget.value),
            value: email.value,
            readOnly: email.readOnly || formAction !== 'email'
          }}
          busy={email.busy}
          meta={email}
          label="E-mail"
        />
        {formAction === 'email' && (
          <RenderButton
            label="next"
            input={{
              disabled: !email.valid || email.busy,
              onClick: () => this.checkEmailForNextAction()
            }}

          />
        )}

        {formAction === 'login' && (
          <>
          <RenderField
            input={{
              onChange: e => this.onInputPasswordChange(e.currentTarget.value),
              value: password.value
            }}
            meta={password}
            type={password.type}
            label="Password"
          />
          <RenderCheckbox
            input={{
              onChange: () => this.onInputShowPasswordChange(),
              checked: showPassword.value
            }}
            meta={password}
            label="Show/hide password"
          />
          </>
        )}

      </div>
    );
  }
}

AuthenticationForm.propTypes = propTypes;
AuthenticationForm.defaultProps = defaultProps;

export default AuthenticationForm;
