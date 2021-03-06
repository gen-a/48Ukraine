import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Counter from '../../components/UI/Counter';
import { updateProductInCart } from '../../actions/cart';
import PriceSticker from '../../components/PriceSticker';
import Image from '../../components/UI/FlexibleImage/FlexibleImage';
import IconClose from '../../components/Svg/IconClose';
import PageTitle from '../../components/PageTitle';
import Redirect from '../../components/Router/Redirect';
import { localizePath } from '../../localization/index';
import { NavLink } from 'react-router-dom';

import './Cart.scss'


/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Call add flash message handler */
  callAddFlashMessage: PropTypes.func.isRequired,
  /** Show loader handler */
  callShowLoader: PropTypes.func.isRequired,
  /** Hide loader handler */
  callHideLoader: PropTypes.func.isRequired,
  /** Show toast handler */
  callShowToast: PropTypes.func.isRequired,
  /** Match parameters */
  match: PropTypes.shape({
    params: PropTypes.shape({
      department: PropTypes.string,
      page: PropTypes.string
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  /** Current locale */
  locale: PropTypes.string.isRequired,
  /** List of products. */
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ),
  /** Number of products in the cart. */
  count: PropTypes.number,
  /** Total price of the cart. */
  total: PropTypes.number,
  /** Handler to change number of product in the cart. */
  callUpdateProductInCart: PropTypes.func.isRequired,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  products: [],
  count: 0,
  total: 0,
};

const Cart = ({ products, callUpdateProductInCart, count, total, locale }) => {
  if (products.length === 0) {
    return (
      <Redirect
        to={localizePath('/', locale)}
        message={{
          body: 'Ваш кошик порожній.',
          title: 'повідомлення кошика',
          type: 'error'
        }}
      />);
  }
  return (
    <>
    <PageTitle
      title="Мій кошик"
      description="Скорегуйте кількість товарів в кошику та натисніть кнопку Замовити для завершення замовлення."
    />
    {products.map(p => (
      <div key={p.id} className="Cart__item">
        <div className="Cart__itemImage">
          <div className="Cart__itemThumbnail">
            <Image src={p.thumbnail} alt={p.name}/>
          </div>
        </div>
        <div className="Cart__itemName">
          <p>{p.name}</p>
          <div className="Cart__itemPrice">
            <PriceSticker retail={p.price} currency="$" fontSize="1.25rem"/>
          </div>
        </div>
        <div className="Cart__itemQuantity">
          <Counter min={1} max={10} value={p.quantity} onChange={(value) => callUpdateProductInCart(p.id, value)}/>
        </div>
        <div className="Cart__itemTotal">
          <PriceSticker retail={p.quantity * p.price} currency="$" fontSize="1.25rem"/>
        </div>
        <div className="Cart__remove">
          <button
            className="Cart__removeButton"
            onClick={() => callUpdateProductInCart(p.id, 0)}
          >
            <IconClose width="24px" height="24px"/>
          </button>
        </div>
      </div>
    ))}
    <div className="Cart__summary">
      <div className="Cart__count">{count}</div>
      <div className="Cart__total">
        <PriceSticker retail={total} currency="$" fontSize="1.25rem"/>
      </div>
    </div>
    <div style={{textAlign: 'center'}}>
    <NavLink
      to={localizePath('/checkout', locale)}
      className="Cart__checkoutButton"
    >
      Замовити
    </NavLink>
    </div>

    </>



  );


};

Cart.propTypes = propTypes;
Cart.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    locale: state.app.locale,
    products: state.cart.products,
    total: state.cart.total,
    count: state.cart.count,
  }
);
const mapDispatchToProps = dispatch => (
  {
    callUpdateProductInCart: (id, quantity) => dispatch(updateProductInCart(id, quantity)),
  }
);
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
