/**
 * PageTitle Component.
 * Placeholder fot the description
 * @module PageTitle
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';

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
  /** Canonical href for head. */
  canonical: PropTypes.string,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  description: '',
  canonical: ''
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const PageTitle = ({ title, description, canonical }) =>{
  return (
    <div className="PageTitle">
      <h1 className="PageTitle__title">{title}</h1>
      <p className="PageTitle__description">{description}</p>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {title} | 48Ukraine | Якісні товари за найкращими цінами з доставкою в Україну!</title>
        { canonical !== '' &&  <link rel="canonical" href={canonical} />}
      </Helmet>
    </div>
  );
};

PageTitle.propTypes = propTypes;
PageTitle.defaultProps = defaultProps;

export default PageTitle;
