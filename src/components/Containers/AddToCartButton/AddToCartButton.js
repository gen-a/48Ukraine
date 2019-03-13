/**
 * AddToCartButton Component.
 * Placeholder fot the description
 * @module AddToCartButton
 */
import { connect } from 'react-redux';
import AddToCartButton from '../../AddToCartButton';
import { addProductToCart } from '../../../actions/cart';

const mapStateToProps = state => (
  {
    inCartQuantities: state.cart.quantities,
  }
);
const mapDispatchToProps = dispatch => (
  {
    callAddProductToCart: product => dispatch(addProductToCart(product)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartButton);
