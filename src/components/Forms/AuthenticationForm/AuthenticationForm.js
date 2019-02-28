/**
 * AuthenticationForm Component.
 * Placeholder fot the description
 * @module AuthenticationForm
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RenderField from '../../UI/Forms/RenderField' ;
import RenderCheckbox from '../../UI/Forms/RenderCheckbox' ;
import { email as validateEmail, password as validatePassword } from '../../../validation/validations' ;
import RenderButton from '../../UI/Forms/RenderButton/RenderButton';

import './AuthenticationForm.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Check E-mail. */
  onCheckEmail: PropTypes.func,
  /** Check password. */
  onCheckPassword: PropTypes.func,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  onCheckEmail: cb => setTimeout(() => cb(), 2000),
  onCheckPassword: cb => setTimeout(() => cb(), 2000),
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
          valid: false,
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

  onCheckEmailForNextAction() {
    this.setState(prevState => ({
      ...prevState,
      formAction: 'login',
      fields: {
        ...prevState.fields,
        email: {
          ...prevState.fields.email,
          busy: false,
          readOnly: false
        }
      }
    }));
  }

  onCheckPasswordForNextAction() {
    this.setState(prevState => ({
      ...prevState,
      formAction: 'login',
      fields: {
        ...prevState.fields,
        email: {
          ...prevState.fields.email,
          readOnly: false
        },
        password: {
          ...prevState.fields.password,
          busy: false,
          readOnly: false
        }
      }
    }));
  }

  onInputPasswordBlur() {
    const { fields: { password: { value } } } = this.state;
    const valid = validatePassword(value);
    this.setState(prevState => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        password: {
          ...prevState.fields.password,
          error: value.length === 0 || valid ? '' : 'Invalid password',
          valid
        }
      }
    }));
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

  onInputPasswordFocus() {
    this.setState(prevState => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        password: {
          ...prevState.fields.password,
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
      },
      formAction: 'email'
    }));
  }

  onInputPasswordChange(value) {
    this.setState(prevState => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        password: {
          ...prevState.fields.password,
          value
        }
      }
    }));
  }

  onInputShowPasswordChange() {
    const { fields: { showPassword: { value }, password: { type } } } = this.state;
    this.setState(prevState => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        showPassword: {
          ...prevState.fields.showPassword,
          value: !value
        },
        password: {
          ...prevState.fields.password,
          type: type === 'password' ? 'text' : 'password'
        }
      }
    }));
  }

  checkEmailForNextAction() {
    const { onCheckEmail } = this.props;
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
    onCheckEmail(this.onCheckEmailForNextAction.bind(this));
  }

  checkPasswordForNextAction() {
    const { onCheckPassword } = this.props;
    this.setState(prevState => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        email: {
          ...prevState.fields.email,
          readOnly: true
        },
        password: {
          ...prevState.fields.password,
          busy: true,
          readOnly: true
        }
      }
    }));
    onCheckPassword(this.onCheckPasswordForNextAction.bind(this));
  }

  render() {
    const { fields: { email, password, showPassword }, formAction } = this.state;
    return (
      <div className="AuthenticationForm">
        <h2 className="AuthenticationForm__title">Authentication</h2>

        <div className="AuthenticationForm__row">
          <RenderField
            input={{
              onBlur: () => this.onInputEmailBlur(),
              onFocus: () => this.onInputEmailFocus(),
              onChange: e => this.onInputEmailChange(e.currentTarget.value),
              value: email.value,
              readOnly: email.readOnly
            }}
            busy={email.busy}
            meta={email}
            label="E-mail"
          />
        </div>

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
          <div className="AuthenticationForm__row">
            <RenderField
              input={{
                onBlur: () => this.onInputPasswordBlur(),
                onFocus: () => this.onInputPasswordFocus(),

                onChange: e => this.onInputPasswordChange(e.currentTarget.value),
                value: password.value,
                readOnly: password.readOnly
              }}
              busy={password.busy}
              meta={password}
              type={password.type}
              label="Password"
            />
            <RenderCheckbox
              input={{
                onChange: () => this.onInputShowPasswordChange(),
                checked: showPassword.value
              }}
              label="Show/hide password"
            />
          </div>
        )}

        {formAction === 'login' && (
          <RenderButton
            label="next"
            input={{
              disabled: !password.valid || password.busy,
              onClick: () => this.checkPasswordForNextAction()
            }}

          />
        )}
      </div>
    );
  }
}

AuthenticationForm.propTypes = propTypes;
AuthenticationForm.defaultProps = defaultProps;

export default AuthenticationForm;
