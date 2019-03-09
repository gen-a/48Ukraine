/**
 * ProductCard Component.
 * Placeholder fot the description
 * @module ProductCard
 */
import React from 'react';
import PropTypes from 'prop-types';
import {IMG_PRODUCTS_DIR} from '../../config/app';
import Price from './Price';

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
const ProductCard = ({minItemPrice, minItemSalePrice, name, image, itemPrice, attributesInfo, productInStoreQuantity,}) =>{


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
        <a href="" title="Детальніше">
          <img className="ProductCard__image" src={`${IMG_PRODUCTS_DIR}/sm-${image}`} alt={name} />
        </a>
      </div>

        <div className="ProductCard__infoBlock">

          <p className="ProductCard__inStore">{productInStoreQuantity}</p>

          <p className="ProductCard__price">
            <Price retail={minItemPrice} sale={minItemSalePrice} />
          </p>

          <h3 className="ProductCard__name">
            <a href="" title="Детальніше">
              {name}
              </a>
          </h3>

          <p className="ProductCard__info">{attributesInfo} </p>




{/*
          <div class="product-list-entity__more-info-block">
            <a class="product-list-entity__more-info" href="/product/7590/Majonez-Schedro-Provansal-stolovij-visokokalorijnij-zhirnist-67-190hr">
              Інформація                        </a>
          </div>

          <div class="product-list-entity__shopping-block">
            <input class="product-list-entity__shopping-number" type="text" value="1" id="inputItemsNumber7593" data-add-to-shopping-cart-number-of="7593" data-add-to-shopping-cart-number-of-type="product">
              <button class="product-list-entity__button product-list-entity__button--add-to-cart" data-add-to-shopping-cart-id="7593" data-add-to-shopping-cart-type="product" data-add-to-shopping-cart-number-input-id="inputItemsNumber7593">
                Додати до кошика                                </button>

          </div>*/}



        </div>
    </div>




  );
};

ProductCard.propTypes = propTypes;
ProductCard.defaultProps = defaultProps;

export default ProductCard;
