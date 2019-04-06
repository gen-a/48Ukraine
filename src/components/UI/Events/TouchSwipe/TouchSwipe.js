import { Component } from 'react'
import Swipe from '../../../../utils/events/swipe';
import PropTypes from 'prop-types';


/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Target element for swipe detection. */
  target: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  /** Min swipe distance to detect swipe. */
  swipeDistance: PropTypes.number,
  /** Max swipe time to detect swipe. */
  swipeTime: PropTypes.number,
  /** OnSwipe handler. */
  onSwipe: PropTypes.func.isRequired
};

/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  swipeDistance: 30,
  swipeTime: 300
};

class TouchSwipe extends Component {

  /**
   * Touch start handler
   * @param touches {TouchList}
   */
  touchstart = ({ touches }) => {
    this.isActive = touches.length === 1;
    if (this.isActive) {
      this.swipe.start(touches[0].clientX, touches[0].clientY);
    }
  };
  /**
   * Touch move handler
   * @param touches {TouchList}
   */
  touchmove = ({ touches }) => {
    if (this.isActive) {
      this.swipe.move(touches[0].clientX, touches[0].clientY);
    }
  };
  /**
   * Touch end handler
   */
  touchend = () => {
    if (this.isActive) {
      this.swipe.end();
    }
  };

  /**
   * Add or remove event listeners
   * @param action {string} - addEventListener or removeEventListener
   */
  setListeners(action){
    const { target: { current: element } } = this.props;
    ['touchstart', 'touchmove', 'touchend'].forEach(key => element[action](key, this[key]));
  }

  /**
   * Configure swipe
   */
  
  componentDidMount() {
    const { onSwipe, swipeDistance, swipeTime } = this.props;
    this.isActive = false;
    this.swipe = new Swipe(swipeDistance, swipeTime);
    this.setListeners('addEventListener');
    /** Connect swipe handler. */
    this.swipe.onSwipe = onSwipe;
  }

  render() {
    return null;
  }
}

TouchSwipe.propTypes = propTypes;
TouchSwipe.defaultProps = defaultProps;

export default TouchSwipe;
