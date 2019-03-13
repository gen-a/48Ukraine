/**
 * ProductLeaflet Component.
 * Placeholder fot the description
 * @module ProductLeaflet
 */
import React from 'react';
import PropTypes from 'prop-types';
import AddToCartButton from '../Containers/AddToCartButton';
import ImageViewer from '../UI/ImageViewer';
import PriceSticker from '../PriceSticker';

import './ProductLeaflet.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Text message of the toast. */
  images: PropTypes.arrayOf(
    PropTypes.shape({
      sm: PropTypes.string,
      fs: PropTypes.string,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.shape({
    retail: PropTypes.number,
    sale: PropTypes.number,
  }).isRequired,
  name: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  //specifications,
  mediaPrefix: PropTypes.string.isRequired
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
const ProductLeaflet = ({ images, id, price, name, info, description, attributes, mediaPrefix }) => {

  return (
    <div className="ProductLeaflet">


      <div className="ProductLeaflet__title">
        <h1>{name}</h1>
        {info && <p>{info}</p>}
      </div>

      <div className="ProductLeaflet__imageViewer">
        <ImageViewer
          images={images}
          orientation={mediaPrefix === 'sm' ? 'portrait' : 'landscape'}
        />
      </div>

      <div className="ProductLeaflet__buyNow">

        <PriceSticker
          retail={price.retail}
          sale={price.sale}
          currency="$"
          fontSize="2rem"
        />
        <div className="ProductLeaflet__divider" style={{ marginBottom: '1rem' }}/>
        <AddToCartButton
          product={{
            id,
            price: price.sale > 0 ? price.sale : price.retail,
            name,
            thumbnail: images[0].sm
          }}
          label="Додати до кошика"
          numberInCartLabel="вже в кошику"
        />
        <div className="ProductLeaflet__divider" style={{ marginTop: '1rem' }}/>

        <div className="ProductLeaflet__description">
          <p>{description}</p>
        </div>

        {attributes.length > 0 && (
          <>
            <h2>Інформація</h2>
            <div className="ProductLeaflet__info">
              {attributes.map(a => (
                <div className="ProductLeaflet__infoRow">
                  <div className="ProductLeaflet__infoAttribute">{a.attribute}</div>
                  <div className="ProductLeaflet__infoValue">{a.value}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

ProductLeaflet.propTypes = propTypes;
ProductLeaflet.defaultProps = defaultProps;

export default ProductLeaflet;
