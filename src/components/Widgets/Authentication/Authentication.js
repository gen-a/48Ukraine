/**
 * Authentication Component.
 * Placeholder fot the description
 * @module Authentication
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import RestorePassword from '../RestorePassword';

import {
  Divider,
  Field,
  CircularProgress,
  Button,
  Switch,
  Checkbox
} from '../../UI/MaterialUI' ;

import { email as validateEmail, password as validatePassword } from '../../../validation/validations' ;
import { URL_AUTH_CHECK_EMAIL, URL_AUTH_CHECK_PASSWORD } from '../../../config/api';
import { post } from '../../../services/ajax';

import './Authentication.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** On successful login handler. */
  onLogIn: PropTypes.func,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  onLogIn: console.log,
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class Authentication extends Component {
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
        },
        rememberMe: {
          value: false,
        },
      },
    };
  }

  /**
   * Handle input password blur event
   */
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

  /**
   * Handle input email blur event
   */
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

  /**
   * Handle input email focus event
   */
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

  /**
   * Handle input password focus event
   */
  onInputPasswordFocus() {
    this.setState(prevState => update(prevState, {
      fields: {
        password: {
          error: { $set: '' }
        }
      }
    }));
  }

  /**
   * Handle input email change event
   */
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

  /**
   * Handle input password change event
   */
  onInputPasswordChange(value) {
    this.setState(prevState => update(prevState, {
      fields: {
        password: {
          value: { $set: value }
        }
      }
    }));
  }

  /**
   * Handle on change remember me checkbox
   */
  onRememberMeChange() {
    const { fields: { rememberMe: { value } } } = this.state;
    this.setState(prevState => update(prevState, {
      fields: {
        rememberMe: {
          value: { $set: !value }
        }
      }
    }));
  }

  /**
   * Handle input showPassword change event
   */
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

  /**
   * Handle server after checking email response
   */
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

  /**
   * Handle server after checking password response
   */
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
      const { onLogIn } = this.props;
      onLogIn(result.data);
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

  /**
   * Prepare and send request to the server for checking email
   */
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
    post(
      URL_AUTH_CHECK_EMAIL,
      { email },
      this.handleCheckEmailResult.bind(this)
    );
  }

  /**
   * Prepare and send request to the server for checking password
   */
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
    post(
      URL_AUTH_CHECK_PASSWORD,
      { email, password },
      this.handleCheckPasswordResult.bind(this)
    );
  }

  render() {
    const { fields: { email, password, showPassword, rememberMe }, formAction } = this.state;
    return (
      <div className="Authentication">

        <h2 className="Authentication__title">Authentication</h2>

        <form noValidate autoComplete="off">
          <div className="Authentication__row">
            <Field
              input={{
                onBlur: () => this.onInputEmailBlur(),
                onFocus: () => this.onInputEmailFocus(),
                onChange: e => this.onInputEmailChange(e.currentTarget.value),
                value: email.value,
                readOnly: email.readOnly
              }}
              meta={email}
              label="E-mail"
            />
          </div>

          {formAction === 'email' && (

            <div className="Authentication__row">
              <Divider/>
              <Button
                label="next"
                input={{
                  disabled: !email.valid || email.busy,
                  onClick: () => this.checkEmailForNextAction()
                }}

              />
              {email.busy && <CircularProgress/>}
            </div>
          )}

          {formAction === 'login' && (
            <>
            <div className="Authentication__row">
              <div className="Authentication__handlerMessage">
                {email.handlerMessage}
              </div>
            </div>
            <div className="Authentication__row">
              <Field
                input={{
                  onBlur: () => this.onInputPasswordBlur(),
                  onFocus: () => this.onInputPasswordFocus(),

                  onChange: e => this.onInputPasswordChange(e.currentTarget.value),
                  value: password.value,
                  readOnly: password.readOnly
                }}
                meta={password}
                type={password.type}
                label="Password"
              />
              <Switch
                onChange={() => this.onInputShowPasswordChange()}
                checked={showPassword.value}
                label="Show/hide password"
              />
              <Checkbox
                onChange={() => this.onRememberMeChange()}
                checked={rememberMe.value}
                label="Remember me on this device"
              />
            </div>
            </>
          )}

          {formAction === 'login' && (
            <div className="Authentication__row">
              <Divider/>
              <Button
                label="login"
                input={{
                  disabled: !password.valid || password.busy,
                  onClick: () => this.checkPasswordForNextAction()
                }}
              />
              {password.busy && <CircularProgress/>}
            </div>
          )}
        </form>

        <RestorePassword email={email.value} />




      </div>
    );
  }
}

Authentication.propTypes = propTypes;
Authentication.defaultProps = defaultProps;

export default Authentication;
