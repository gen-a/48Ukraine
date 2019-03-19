/**
 * ProductCard Component.
 * Placeholder fot the description
 * @module ProductCard
 */
import React from 'react';
import PropTypes from 'prop-types';
import PriceSticker from '../PriceSticker';
import AddToCartButton from '../Containers/AddToCartButton';
import Image from '../UI/FlexibleImage/FlexibleImage';

import markSale from './mark-sale.svg';
import markPromo from './mark-promo.svg';

import './ProductCard.scss';
import NavLink from "react-router-dom/es/NavLink";

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  inCart: PropTypes.number.isRequired,
  price: PropTypes.shape({
    retail: PropTypes.number,
    sale: PropTypes.number,
  }).isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  attributesInfo: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.oneOf(['vertical', 'horizontal']),
  isOnSale: PropTypes.bool,
};
const defaultProps = {
  priceSale: 0,
  attributesInfo: '',
  url: '',
  type: 'horizontal',
  isOnSale: false
};
/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const ProductCard = ({ url, id, inCart, price, name, image, attributesInfo, type, isOnSale }) => {

  const rootClassName = type === 'vertical'
    ? 'ProductCard ProductCard_vertical'
    : 'ProductCard';

  return (

    <div className={inCart ? `${rootClassName} ProductCard_isInCart` : rootClassName}>

      {isOnSale && (
          <img src={markPromo} className="ProductCard__markPromo" alt="sale"/>
      )}


      <div className="ProductCard__imageBlock">

        <div className="ProductCard__image">
          <NavLink to={url}>
            <Image src={image} alt={name}/>
          </NavLink>
        </div>
        <div className="ProductCard__price">
          <PriceSticker retail={price.retail} sale={price.sale}/>
        </div>
        {price.sale
        &&
        <img src={markSale} className="ProductCard__markSale" alt="sale"/>
        }
      </div>

      <div className="ProductCard__infoBlock">

        <h3 className="ProductCard__name">
          <NavLink to={url}>
            {name}
          </NavLink>
        </h3>

        <p className="ProductCard__info">{attributesInfo} </p>

        <div className="ProductCard__button">

          <AddToCartButton
            product={{
              id,
              price: price.sale > 0 ? price.sale : price.retail,
              name,
              thumbnail: image
            }}
            label="Додати до кошика"
            numberInCartLabel="вже в кошику"
          />

        </div>

      </div>

    </div>

  );
};

ProductCard.propTypes = propTypes;
ProductCard.defaultProps = defaultProps;

export default ProductCard;
