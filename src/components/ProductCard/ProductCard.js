/**
 * ProductCard Component.
 * Placeholder fot the description
 * @module ProductCard
 */
import React from 'react';
import PropTypes from 'prop-types';
import { IMG_PRODUCTS_DIR } from '../../config/app';
import Price from './Price';
import Button from './Button';


import markSale from './mark-sale.svg';
import './ProductCard.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  inCart: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
  priceRetail: PropTypes.number.isRequired,
  priceSale: PropTypes.number,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  attributesInfo: PropTypes.string
};
const defaultProps = {
  priceSale: 0,
  attributesInfo: ''
};
/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const ProductCard = ({ inCart, addToCart, priceRetail, priceSale, name, image, attributesInfo }) => {

  return (
    <div className={inCart ? 'ProductCard ProductCard_isInCart' : 'ProductCard'}>

      <div className="ProductCard__imageBlock">
        <img className="ProductCard__image" src={image} alt={name}/>

        <div className="ProductCard__price">
          <Price retail={priceRetail} sale={priceSale}/>
        </div>
        {priceSale
        &&
        <img src={markSale} className="ProductCard__markSale" alt="sale"/>
        }
      </div>

      <div className="ProductCard__infoBlock">

        <h3 className="ProductCard__name">
          {name}
        </h3>

        <p className="ProductCard__info">{attributesInfo} </p>

        <div className="ProductCard__button">
          <Button
            label="Додати до кошика"
            numberInCart={inCart}
            numberInCartLabel="вже в кошику"
            onClick={() => addToCart()}
          />
        </div>

      </div>
    </div>
  );
};

ProductCard.propTypes = propTypes;
ProductCard.defaultProps = defaultProps;

export default ProductCard;
