import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Counter from '../../components/UI/Counter';
import { updateProductInCart } from '../../actions/cart';
import PriceSticker from '../../components/PriceSticker';

import './Cart.scss';
import Image from "../../components/UI/Image/Image";



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
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  products: []
};

const Cart = ({products, callUpdateProductInCart})=>{
  if(products.length === 0){
    return (<div>
      <h1>Your cart is empty</h1>
    </div>);
  }



  return (
    <>
    <h1>Shopping cart</h1>

  {products.map( p => (
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
          <Counter min={1} max={10} value={p.quantity} onChange={(value)=>callUpdateProductInCart(p.id, value)}/>
        </div>
        <div className="Cart__itemTotal">
          <PriceSticker retail={p.quantity * p.price} currency="$" fontSize="1.25rem"/>
        </div>



      </div>



    ))}

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
