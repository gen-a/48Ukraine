/**
 * AuthenticationForm Component.
 * Placeholder fot the description
 * @module AuthenticationForm
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import axios from 'axios';
import RenderField from '../../UI/Forms/RenderField' ;
import RenderCheckbox from '../../UI/Forms/RenderCheckbox' ;
import { email as validateEmail, password as validatePassword } from '../../../validation/validations' ;
import RenderButton from '../../UI/Forms/RenderButton/RenderButton';

import './AuthenticationForm.scss';
import Ripple from '../../UI/Ripple/Ripple';

const URL_AUTH_CHECK_EMAIL = '/data/auth/email';
const URL_AUTH_CHECK_PASSWORD = '/data/auth/login';

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
          readOnly: false,
          handlerMessage: ''
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

  sendRequest(url, data, cb) {
    axios.post(url, data)
      .then(response => cb(response.data))
      .catch(err => cb({ message: err.message, error: 1, data: {} }));
  }


  handleCheckEmailResult(result) {
    if (result.error === 0) {
      this.setState(prevState => update(prevState, {
        formAction: { $set: 'login' },
        fields: {
          email: {
            busy: { $set: false },
            readOnly: { $set: false },
            error: { $set: '' },
            handlerMessage: { $set: result.message },
          }
        }
      }));

    } else {
      this.setState(prevState => update(prevState, {
        fields: {
          email: {
            busy: { $set: false },
            readOnly: { $set: false },
            error: { $set: result.message },
            handlerMessage: { $set: '' },
          }
        }
      }));
    }
  }

  handleCheckPasswordResult(result) {
    if (result.error === 0) {
      this.setState(prevState => update(prevState, {
        formAction: { $set: 'login' },
        fields: {
          email: {
            readOnly: { $set: false },
          },
          password: {
            busy: { $set: false },
            readOnly: { $set: false },
          }
        }
      }));
      console.log('YOU HAVE BEEN LOGGED IN');
    } else {
      this.setState(prevState => update(prevState, {
        formAction: { $set: 'login' },
        fields: {
          email: {
            readOnly: { $set: false },
          },
          password: {
            busy: { $set: false },
            readOnly: { $set: false },
            error: { $set: result.message },
          }
        }
      }));
    }
  }

  onInputPasswordBlur() {
    const { fields: { password: { value } } } = this.state;
    const valid = validatePassword(value);
    this.setState(prevState => update(prevState, {
      fields: {
        password: {
          error: { $set: value.length === 0 || valid ? '' : 'Invalid password' },
          valid: { $set: valid },
        }
      }
    }));
  }

  onInputEmailBlur() {
    const { fields: { email: { value } } } = this.state;
    const valid = validateEmail(value);
    this.setState(prevState => update(prevState, {
      fields: {
        email: {
          error: { $set: value.length === 0 || valid ? '' : 'Invalid e-mail address' },
          valid: { $set: valid },
        }
      }
    }));
  }

  onInputEmailFocus() {
    this.setState(prevState => update(prevState, {
      formAction: { $set: 'email' },
      fields: {
        email: {
          error: { $set: '' },
          handlerMessage: { $set: '' },
        },
        password: {
          valid: { $set: false },
          error: { $set: '' },
          value: { $set: '' },
          type: { $set: 'password' },
        },
        showPassword: {
          value: { $set: false },
        }
      }
    }));
  }

  onInputPasswordFocus() {
    this.setState(prevState => update(prevState, {
      fields: {
        password: {
          error: { $set: '' }
        }
      }
    }));
  }

  onInputEmailChange(value) {
    this.setState(prevState => update(prevState, {
      fields: {
        email: {
          value: { $set: value }
        }
      },
      formAction: { $set: 'email' }
    }));
  }

  onInputPasswordChange(value) {
    this.setState(prevState => update(prevState, {
      fields: {
        password: {
          value: { $set: value }
        }
      }
    }));
  }

  onInputShowPasswordChange() {
    const { fields: { showPassword: { value }, password: { type } } } = this.state;
    this.setState(prevState => update(prevState, {
      fields: {
        showPassword: {
          value: { $set: !value }
        },
        password: {
          type: { $set: type === 'password' ? 'text' : 'password' }
        }
      }
    }));
  }

  checkEmailForNextAction() {
    this.setState(prevState => update(prevState, {
      fields: {
        email: {
          busy: { $set: true },
          readOnly: { $set: true }
        }
      }
    }));
    const { fields: { email: { value: email } } } = this.state;
    this.sendRequest(
      URL_AUTH_CHECK_EMAIL,
      { email },
      this.handleCheckEmailResult.bind(this)
    );
  }

  checkPasswordForNextAction() {
    this.setState(prevState => update(prevState, {
      fields: {
        email: {
          readOnly: { $set: true }
        },
        password: {
          busy: { $set: true },
          readOnly: { $set: true }
        }
      }
    }));
    const { fields: { email: { value: email }, password: { value: password } } } = this.state;
    this.sendRequest(
      URL_AUTH_CHECK_PASSWORD,
      { email, password },
      this.handleCheckPasswordResult.bind(this)
    );
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
          <Ripple>
            <RenderButton
              label="next"
              input={{
                disabled: !email.valid || email.busy,
                onClick: () => this.checkEmailForNextAction()
              }}

            />
          </Ripple>
        )}

        {formAction === 'login' && (
          <>
          <div className="AuthenticationForm__row">
            <div className="AuthenticationForm__handlerMessage">
              {email.handlerMessage}
            </div>
          </div>
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
          </>
        )}

        {formAction === 'login' && (
          <Ripple>
            <RenderButton
              label="login"
              input={{
                disabled: !password.valid || password.busy,
                onClick: () => this.checkPasswordForNextAction()
              }}
            />
          </Ripple>
        )}
      </div>
    );
  }
}

AuthenticationForm.propTypes = propTypes;
AuthenticationForm.defaultProps = defaultProps;

export default AuthenticationForm;
