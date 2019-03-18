/**
 * OrdersList Component.
 * Placeholder fot the description
 * @module OrdersList
 */
import React from 'react';
import PropTypes from 'prop-types';
import PriceSticker from '../PriceSticker';
import Pagination from '../UI/Pagination';
import { replaceInRoute } from '../../utils/helpers';

import './OrdersList.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Current page number. */
  currentPage: PropTypes.number,
  /** Total number of pages. */
  pagesTotal: PropTypes.number,
  /** URL template for url pagination links generation. */
  paginationUrl: PropTypes.string,
  /** Orders list data. */
  orders: PropTypes.arrayOf(
    PropTypes.shape({

    })
  ),
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  pagesTotal: 0,
  currentPage: 0,
  paginationUrl: '',
  orders: [],
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const OrdersList = ({ pagesTotal, paginationUrl, orders, currentPage }) => {
  return (
    <>
    {pagesTotal > 1 && (
      <Pagination
        key={paginationUrl}
        limit={5}
        total={pagesTotal}
        current={parseInt(currentPage, 10)}
        url={paginationUrl}
      />
    )}
    <div className="OrdersList">
      <ul>
      {orders.map(order => (
        <li key={order.creationDate} className="OrdersList__entry">
          <div className="OrdersList__entryNumber">{order.number}</div>
          <div className="OrdersList__entryDate">{order.creationDate}</div>
          <div className="OrdersList__entryName">{order.toFirstName} {order.toLastName}</div>
          <div className="OrdersList__entryAddress">{order.toAddress}, {order.toZip}, {order.toCity}</div>
          <div className="OrdersList__entryPhone">{order.toPhone}</div>
          <div className="OrdersList__entryCount">{order.count}</div>
          <div className="OrdersList__entryTotal">
            <PriceSticker retail={order.total} fontSize="1rem"/>
          </div>
        </li>
      ))}
      </ul>
    </div>
    </>
  );
};

OrdersList.propTypes = propTypes;
OrdersList.defaultProps = defaultProps;

export default OrdersList;
