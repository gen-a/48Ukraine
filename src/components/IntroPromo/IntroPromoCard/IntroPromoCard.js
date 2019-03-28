/**
 * IntroPromoCard Component.
 * Placeholder fot the description
 * @module IntroPromoCard
 */
import React from 'react';
import PropTypes from 'prop-types';

import './IntroPromoCard.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Title of the card. */
  title: PropTypes.string.isRequired,
  /** Text of the card. */
  text: PropTypes.string.isRequired,
  /** Icon image. */
  svg: PropTypes.node.isRequired,
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const IntroPromoCard = ({ title, text, svg }) => {
  return (
    <div className="IntroPromoCard">
      <div className="IntroPromoCard__image">
        <img
          src={svg}
          style={{
            width: '100%',
            maxWidth: '96px',
            margin: '0 auto 1rem auto',
            display: 'block'
          }}
          alt={title}
        />
      </div>
      <div className="IntroPromoCard__info">
        <h3 className="IntroPromoCard__title">{title}</h3>
        <p className="IntroPromoCard__text">{text}</p>
      </div>
    </div>
  );
};

IntroPromoCard.propTypes = propTypes;

export default IntroPromoCard;
