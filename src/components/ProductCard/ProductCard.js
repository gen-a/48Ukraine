/**
 * ProductCard Component.
 * Placeholder fot the description
 * @module ProductCard
 */
import React from 'react';
import PropTypes from 'prop-types';
import PriceSticker from '../PriceSticker';
import AddToCartButton from '../Containers/AddToCartButton';
import Image from '../UI/Image';


import markSale from './mark-sale.svg';
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
};
const defaultProps = {
  priceSale: 0,
  attributesInfo: '',
  url: '',
};
/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const ProductCard = ({ url, id, inCart, price, name, image, attributesInfo }) => {

  return (

    <div className={inCart ? 'ProductCard ProductCard_isInCart' : 'ProductCard'}>

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
