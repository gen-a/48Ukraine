/**
 * NotFound Component.
 * Placeholder fot the description
 * @module NotFound
 */
import React from 'react';
import { URL_FETCH_PRODUCTS_ON_SALE } from '../../config/api';
import ProductsPromo from '../../components/ProductsPromo';
import PageTitle from '../../components/PageTitle';
import './NotFound.scss';


/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const NotFound = () =>{
  return (
    <div className="NotFound">
      <PageTitle
        title="404"
        description="Строрінку не знайдено."
      />
      <div className="NotFound__divider"/>
      <ProductsPromo
        url={URL_FETCH_PRODUCTS_ON_SALE}
        title="Спеціальні пропозиції"
        more={{ url: '', label: ''}}
      />
    </div>
  );
};

export default NotFound;
