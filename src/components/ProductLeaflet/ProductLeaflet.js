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
import PageTitle from '../PageTitle';

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
  mediaPrefix: PropTypes.string.isRequired,
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      attribute: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  attributes: []
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const ProductLeaflet = ({ images, id, price, name, info, description, attributes, mediaPrefix }) => {
  return (
    <div className="ProductLeaflet">

      <PageTitle
        title={name}
        description={info}
      />

      <div className="ProductLeaflet__imageArea xs-flex_100 lg-flex_50">
        <div className="ProductLeaflet__imageViewer">
          <ImageViewer
            images={images}
            orientation={['xs', 'sm'].includes(mediaPrefix) ? 'portrait' : 'landscape'}

          />
        </div>
      </div>

      <div className="ProductLeaflet__infoArea xs-flex_100 lg-flex_50">
        <div className="ProductLeaflet__info">

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
            <h2 className="ProductLeaflet__detailsTitle">Інформація</h2>
            <div className="ProductLeaflet__details">
              {attributes.map((a, i) => (
                <div
                  className={`ProductLeaflet__detailsRow ProductLeaflet__detailsRow_${i % 2 ? 'odd' : 'even'}`}
                  key={`${a.attribute}${a.value}`}
                >
                  <div className="ProductLeaflet__detailsAttribute">{a.attribute}</div>
                  <div className="ProductLeaflet__detailsValue">{a.value}</div>
                </div>
              ))}
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

ProductLeaflet.propTypes = propTypes;
ProductLeaflet.defaultProps = defaultProps;

export default ProductLeaflet;
