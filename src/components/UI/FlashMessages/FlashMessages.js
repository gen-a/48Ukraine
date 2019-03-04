/**
 * FlashMessages Component.
 * Placeholder fot the description
 * @module FlashMessages
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import FlashMessage from './FlashMessage';
import { APP_ROOT } from '../../../config/app';

import './FlashMessages.scss';
import Scrim from '../Scrim';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Array of stored messages to show. */
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    type: PropTypes.string,
  })),
  /** Handler for removing message. */
  callRemoveFlashMessage: PropTypes.func,
  /** Handler for removing all messages. */
  callRemoveAllFlashMessages: PropTypes.func
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  data: [],
  callRemoveFlashMessage: console.log,
  callRemoveAllFlashMessages: console.log
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class FlashMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removing: [],
      collapse: false
    };
  }

  removeMessage(id) {
    const { data, callRemoveFlashMessage } = this.props;
    this.setState(prevState => ({
      ...prevState,
      removing: [...prevState.removing, id],
      collapse: true
    }));
    setTimeout(() => callRemoveFlashMessage(id), data.length > 1 ? 400 : 200);
  }

  removeAllMessages() {
    const { data, callRemoveAllFlashMessages} = this.props;
    data.forEach((message, i) => {
      setTimeout(()=>{
        this.setState(prevState => ({
          ...prevState,
          removing: [...prevState.removing, message.id],
          collapse: false
        }));
      }, 100 * i);
    });
    setTimeout(() => callRemoveAllFlashMessages(), data.length * 100);
  }

  render() {
    const { data } = this.props;
    const { removing, collapse } = this.state;

    const className = data.length > 0
      ? 'FlashMessages FlashMessages_isVisible'
      : 'FlashMessages';

    return ReactDOM.createPortal(
      (
        <div className={className}>
          <Scrim
            onClick={() => this.removeAllMessages()}
            isVisible={data.length > 0}
            depth={1}
          />
          <div className="FlashMessages__container">
            {data.map((message) => (
              <FlashMessage
                key={message.id}
                {...message}
                height={110}
                swipeOff={removing.includes(message.id)}
                collapse={collapse && removing.includes(message.id)}
                remove={id => this.removeMessage(id)}
              />
            ))}
          </div>
        </div>

      ),
      APP_ROOT
    );
  }
}


FlashMessages.propTypes = propTypes;
FlashMessages.defaultProps = defaultProps;

export default FlashMessages;
