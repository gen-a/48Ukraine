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
const ProductCard = ({ minItemPrice, minItemSalePrice, name, image, itemPrice, attributesInfo, productInStoreQuantity, }) => {


  /*
  attributesInfo: "Ukraine"
  description: "Пиво Baltika Non-Alcoholic №0 світле пастеризоване безалкогольне 0,5л. Склад: вода, солод ячмінний світлий, солодовий екстракт, ячмінь, хміль. Калорійність в 100г продукту: 33 ккал. Харчова (поживна) цінність у 100г продукту: Вуглеводи - 6.1г. Умови зберігання: зберігати за температури від 5°C до 20°C - 6  місяців Зберігати в сухому приміщенні. Виробник: ПАТ "Карлсберг Україна". Країна виробництва: Україна. Адреса виробничих потужностей: Україна, 03026, м. Київ, вул. Пирогівський шлях, 137. Вміст спирту: 0.5%. Вміст ГМО: Не містить вказаної речовини. Об'єм: 0,5000 л"
  fullName: "Пиво > Пиво Baltika Non-Alcoholic №0 світле пастеризоване безалкогольне 0,5л"
  id: "3061"
  image: "eeca-file_4420.jpeg"
  image:src: "/files/product/eeca/file_4420.jpeg"
  imageSm:src: "/files/product/eeca/sm-file_4420.jpeg"
  info: ""
  itemId: "3051"
  itemInStoreQuantity: "65"
  itemPrice: "0.8952557237"
  itemsCount: "1"
  massValue: null
  maxItemPrice: "1.0078327907"
  minItemPrice: "1.0078327907"
  minItemSalePrice: "0.8952557237"
  name: "Пиво Baltika Non-Alcoholic №0 світле пастеризоване безалкогольне 0,5л"
  outOfStock: false
  pricePerMassValue: null
  productId: "3061"
  productInStoreQuantity: "65"
  sectionId: "224"
  sectionName: "Пиво"
  sectionNameInUrl: "pyvo"
  * */

  return (
    <div className="ProductCard">

      <div className="ProductCard__imageBlock">
        <img className="ProductCard__image" src={`${IMG_PRODUCTS_DIR}/sm-${image}`} alt={name}/>

        <div className="ProductCard__price">
          <Price retail={minItemPrice} sale={minItemSalePrice}/>
        </div>
        {
          minItemSalePrice > 0 && minItemPrice > minItemSalePrice
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
            numberInCart={Math.round(Math.random() * 10)}
            numberInCartLabel="вже в кошику"
            onClick={() => {
              console.log('onClick');
            }}
          />
        </div>

      </div>
    </div>




  );
};

ProductCard.propTypes = propTypes;
ProductCard.defaultProps = defaultProps;

export default ProductCard;
