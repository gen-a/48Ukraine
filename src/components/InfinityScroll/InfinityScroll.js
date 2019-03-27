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
  offset: 200
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class InfinityScroll extends Component {
  static scrollTop() {
    return (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
  }

  constructor(props) {
    super(props);
    this.state = {
      records: [],
      pagesTotal: 0,
      count: 0,
      i: 0
    };
    this.isComplete = false;
    this.isBusy = false;
    this.scroll = 0;
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.fetchNext();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    const { offset } = this.props;
    if (!this.isComplete && !this.isBusy) {
      if (e.target.body.scrollHeight - (window.innerHeight + InfinityScroll.scrollTop()) < offset) {
        this.fetchNext();
      }
    }
  }

  fetchNext() {
    const { url, params, currentPage, callShowLoader, callHideLoader, callAddFlashMessage } = this.props;
    const { i } = this.state;
    this.isBusy = true;
    callShowLoader();
    get(url, { ...params, page: currentPage + i }, (response) => {
      callHideLoader();
      const { error, message, data } = response;
      if (error === 0) {
        this.isComplete = currentPage + i === data.pagesTotal;
        this.setState(prevState => ({
          ...prevState,
          records: [...prevState.records, ...data.records],
          pagesTotal: data.pagesTotal,
          count: data.count,
          i: prevState.i + 1
        }));
      } else {
        callAddFlashMessage(message, 'server response', 'error');
      }
      this.isBusy = false;
    });
  }

  render() {
    const { render, ...otherProps } = this.props;
    const { records, pagesTotal, count, i } = this.state;
    return render({ ...otherProps, records, pagesTotal, count, infinityLoads: i });
  }
}

InfinityScroll.propTypes = propTypes;
InfinityScroll.defaultProps = defaultProps;

const mapDispatchToProps = dispatch => (
  {
    callAddFlashMessage: (body, title, type) => dispatch(addFlashMessage(body, title, type)),
    callShowLoader: () => dispatch(showLoader()),
    callHideLoader: () => dispatch(hideLoader()),
    callShowToast: message => dispatch(showToast(message)),
  }
);

export default connect(null, mapDispatchToProps)(InfinityScroll);
