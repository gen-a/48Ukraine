/**
 * PageTitle Component.
 * Placeholder fot the description
 * @module PageTitle
 */
import React from 'react';
import PropTypes from 'prop-types';

import './PageTitle.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Text of the title. */
  title: PropTypes.string.isRequired,
  /** Text for description. */
  description: PropTypes.string,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  description: '',
};




/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const PageTitle = ({ title, description }) =>{
  return (
    <div className="PageTitle">
      <h1 className="PageTitle__title">{title}</h1>
      <p className="PageTitle__description">{description}</p>
    </div>
  );
};

PageTitle.propTypes = propTypes;
PageTitle.defaultProps = defaultProps;

export default PageTitle;
