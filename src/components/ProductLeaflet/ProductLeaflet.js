/**
 * ProductLeaflet Component.
 * Placeholder fot the description
 * @module ProductLeaflet
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './ProductLeaflet.scss';

import ImageViewer from "../UI/ImageViewer";
import Price from "../Formatters/Price/Price";

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Text message of the toast. */
  //prop: PropTypes.string,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  //prop: '',
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const ProductLeaflet = ({ name, info, description, images, specifications, mediaPrefix }) => {

  return (
    <div className="ProductLeaflet">
      <h1>{name}</h1>
      {info && <p>{info}</p>}


      <div className="ProductLeaflet__imageViewer">
        <ImageViewer
          images={images}
          orientation={mediaPrefix == 'sm' ? 'portrait' : 'landscape'}
        />
      </div>

      <div className="ProductLeaflet__buyNow">

        <Price />
      </div>

      <p>{description}</p>

      {specifications}


      {/* here is going to be body of the component*/}
    </div>
  );
};

ProductLeaflet.propTypes = propTypes;
ProductLeaflet.defaultProps = defaultProps;

export default ProductLeaflet;
