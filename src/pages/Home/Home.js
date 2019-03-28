/**
 * Home Component.
 * Placeholder fot the description
 * @module Home
 */
import React from 'react';

import { URL_FETCH_PRODUCTS_POPULAR, URL_FETCH_PRODUCTS_NEW, URL_FETCH_PRODUCTS_ON_SALE } from '../../config/api';
import './Home.scss';
import HomeSlideShow from '../../components/HomeSlideShow';
import WindowSize from '../../components/Containers/WindowSize';
import ProductsPromo from '../../components/ProductsPromo';
import IntroPromo from '../../components/IntroPromo';


/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const Home = () => {
  return (
    <div className="Home">

      <WindowSize render={props => <HomeSlideShow {...props} />}/>

      <ProductsPromo
        url={URL_FETCH_PRODUCTS_ON_SALE}
        title="Sale products"
        more={{ url: '', label: '' }}
      />

      <IntroPromo/>

      <ProductsPromo
        url={URL_FETCH_PRODUCTS_NEW}
        title="New products"
        more={{ url: '', label: '' }}
      />

      <ProductsPromo
        url={URL_FETCH_PRODUCTS_POPULAR}
        title="Popular products"
        more={{ url: '', label: '' }}
      />

    </div>
  );
};

export default Home;

