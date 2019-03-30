/**
 * Home Component.
 * Placeholder fot the description
 * @module Home
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { URL_FETCH_PRODUCTS_POPULAR, URL_FETCH_PRODUCTS_NEW, URL_FETCH_PRODUCTS_ON_SALE } from '../../config/api';
import HomeSlideShow from '../../components/HomeSlideShow';
import WindowSize from '../../components/Containers/WindowSize';
import ProductsPromo from '../../components/ProductsPromo';
import IntroPromo from '../../components/IntroPromo';

import './Home.scss';
/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const Home = () => {
  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Головна | 48Ukraine | Якісні товари за найкращими цінами з доставкою в Україну!</title>
      <link rel="canonical" href="/" />
    </Helmet>

    <WindowSize render={props => <HomeSlideShow {...props} />}/>

    <h1 className="Home__h1">Якісні товари за найкращими цінами з доставкою в Україну!</h1>

    <div className="Home__divider"/>

    <ProductsPromo
      url={URL_FETCH_PRODUCTS_ON_SALE}
      title="Гарячі пропозиції"
      more={{ url: '', label: '' }}
    />

    <IntroPromo/>

    <div className="Home__divider"/>

    <ProductsPromo
      url={URL_FETCH_PRODUCTS_NEW}
      title="Новинки"
      more={{ url: '', label: '' }}
    />

    <ProductsPromo
      url={URL_FETCH_PRODUCTS_POPULAR}
      title="Популярні продукти"
      more={{ url: '', label: '' }}
    />

    </>
  );
};

export default Home;

