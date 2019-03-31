/**
 * OrdersList Component.
 * Placeholder fot the description
 * @module OrdersList
 */
import React from 'react';
import PropTypes from 'prop-types';
import PriceSticker from '../PriceSticker';
import Pagination from '../UI/Pagination';

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
  records: PropTypes.arrayOf(
    PropTypes.shape({

    })
  ),
  /** Number of steps load by infinity scroll. */
  infinityLoads: PropTypes.number,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  pagesTotal: 0,
  currentPage: 0,
  paginationUrl: '',
  records: [],
  infinityLoads: 0,
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const OrdersList = ({ pagesTotal, paginationUrl, records, currentPage, infinityLoads }) => {
  return (
    <>
    {pagesTotal > 1 && (
      <Pagination
        key={paginationUrl}
        limit={5}
        total={pagesTotal}
        current={parseInt(currentPage, 10)}
        url={paginationUrl}
        infinityLoads={infinityLoads}
      />
    )}
    {records.length === 0 && infinityLoads > 0 && <div className="OrdersList__intro">You have no orders yet...</div>}
    <div className="OrdersList">
      <ul>
      {records.map(order => (
        <li key={order.creationDate} className="OrdersList__entry">
          <div className="OrdersList__entryNumber">{order.number}</div>
          <div className="OrdersList__entryDate">{order.creationDate}</div>
          <div className="OrdersList__entryCount">{order.count}</div>
          <div className="OrdersList__entryTotal">
            <PriceSticker retail={order.total} fontSize="1rem"/>
          </div>
          <div className="OrdersList__entryAddress">
            <span className="OrdersList__entryName">{order.toFirstName} {order.toLastName}</span>
            {order.toAddress}, {order.toZip}, {order.toCity}
          </div>
          <div className="OrdersList__entryPhone">{order.toPhone}</div>
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
