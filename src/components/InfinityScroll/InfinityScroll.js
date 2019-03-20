/**
 * InfinityScroll Component.
 * Placeholder fot the description
 * @module InfinityScroll
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from '../../services/ajax';
import { connect } from 'react-redux';
import { addFlashMessage, showLoader, hideLoader, showToast } from '../../actions/app';

import './InfinityScroll.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Call add flash message handler */
  callAddFlashMessage: PropTypes.func.isRequired,
  /** Show loader handler */
  callShowLoader: PropTypes.func.isRequired,
  /** Hide loader handler */
  callHideLoader: PropTypes.func.isRequired,
  /** Show toast handler */
  callShowToast: PropTypes.func.isRequired,
  /** Url to load data. */
  url: PropTypes.string.isRequired,
  /** GET params to load data. */
  params: PropTypes.shape({}),
  /** Start page number. */
  currentPage: PropTypes.number,
  /** Render children function. */
  render: PropTypes.func.isRequired,
  /** ScrollTop of the listened scroll box. */
  scrollTop: PropTypes.number,
  /** scrollHeight of the listened scroll box. */
  scrollHeight: PropTypes.number,
  /** clientHeight of the listened scroll box. */
  clientHeight: PropTypes.number,
  /** Zone of start scrolling in pixels. */
  offset: PropTypes.number,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  params: {},
  currentPage: 1,
  scrollTop: 0,
  scrollHeight: 0,
  clientHeight: 0,
  offset: 200
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class InfinityScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      i: 0
    };
    this.isComplete = false;
    this.isBusy = false;
    this.scroll = 0;
  }

  componentDidMount() {
    this.loadNext();
  }

  componentDidUpdate() {
    if (!this.isComplete && !this.busy) {
      const { scrollTop, scrollHeight, clientHeight, offset } = this.props;
      const newScroll = scrollHeight - clientHeight - scrollTop;
      if (newScroll !== this.scroll && newScroll < offset) {
        this.loadNext();
      }
      this.scroll = newScroll;
    }
  }

  loadNext() {
    const { url, params, currentPage, callShowLoader, callHideLoader, callShowToast, callAddFlashMessage } = this.props;
    const { i } = this.state;

    this.busy = true;

    callShowLoader();

    get(url, { ...params, page: currentPage + i }, (response) => {
      callHideLoader();
      const { error, message, data } = response;
      if (error === 0) {
        this.isComplete = currentPage + i === data.pagesTotal;
        this.setState(prevState => ({
          ...prevState,
          records: [...prevState.records, ...data.records],
          i: prevState.i + 1
        }));
        callShowToast('browse.info.productsHasBeenLoaded');
      } else {
        callAddFlashMessage(message, 'server response', 'error');
      }
      this.busy = false;
    });
  }

  render() {
    const { render, ...otherProps } = this.props;
    const { records, i } = this.state;
    return render({ ...otherProps, records, infinityLoads: i  });
  }
}

InfinityScroll.propTypes = propTypes;
InfinityScroll.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    scrollTop: state.app.scrollData.scrollTop,
    scrollHeight: state.app.scrollData.scrollHeight,
    clientHeight: state.app.scrollData.clientHeight
  }
);

const mapDispatchToProps = dispatch => (
  {
    callAddFlashMessage: (body, title, type) => dispatch(addFlashMessage(body, title, type)),
    callShowLoader: () => dispatch(showLoader()),
    callHideLoader: () => dispatch(hideLoader()),
    callShowToast: message => dispatch(showToast(message)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(InfinityScroll);
