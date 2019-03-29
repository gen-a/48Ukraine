const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const fs = require('fs');
const axios = require('axios');
const { response } = require('../lib/response');

const toCoins = value => Math.round(parseFloat(value) * 100);

exports.mapListedProducts = (products) => {
  return products.map(p => (
    {
      id: p.id,
      price: {
        retail: toCoins(p.min_item_price),
        sale: toCoins(p.min_item_sale_price)
      },
      isOnSale: p.min_item_sale_price !== null,
      inStore: parseInt(p.product_in_store_quantity, 10),
      name: p.name,
      attributesInfo: p.attributes_info,
      image: {
        fs: `${process.env.DATA_SERVER_URL}${p['image:src']}`,
        sm: `${process.env.DATA_SERVER_URL}${p['image-sm:src']}`,
      }
    }
  ));
}

exports.findPopular = function findPopular(req, res, next) {
  axios.get(`${process.env.DATA_SERVER_URL}/data/products-popular`, { params: req.query })
    .then(result => result.data)
    .then(({data, message, error}) => {
      res.status(200).json(response({
        ...data,
        records: exports.mapListedProducts(data.records).map(p => ({ ...p, isPopular: true }))
      },  message, error));
      return next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};
exports.findNew = function findNew(req, res, next) {

  axios.get(`${process.env.DATA_SERVER_URL}/data/products-new`, { params: req.query })
    .then(result => result.data)
    .then(({data, message, error}) => {
      res.status(200).json(response({
        ...data,
        records: exports.mapListedProducts(data.records).map(p => ({ ...p, isBrandNew: true }))
      }, message, error));
      return next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};
exports.findOnSale = function getProductById(req, res, next) {

  axios.get(`${process.env.DATA_SERVER_URL}/data/products-sale`, { params: req.query })
    .then(result => result.data)
    .then(({data, message, error}) => {
      res.status(200).json(response({
        ...data,
        records: exports.mapListedProducts(data.records)
      }, message, error));
      return next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};


exports.findById = function getProductById(req, res, next) {

  axios.get(`${process.env.DATA_SERVER_URL}/data/product'`, { params: req.query })
    .then(result => result.data)
    .then(({data, message, error}) => {
      const product = {
        ...data,
        images: data.images.map(img =>
          ({
            fs: `${process.env.DATA_SERVER_URL}${img['image:src']}`,
            md: `${process.env.DATA_SERVER_URL}${img['image-sm:src']}`,
            sm: `${process.env.DATA_SERVER_URL}${img['image-sm:src']}`,
          })
        ),
        price: {
          retail: toCoins(data.items[0].price),
          sale: toCoins(data.items[0].sale_price),
        },
        attributes: Object.keys(data.attributes.__all__).map(k => ({
          attribute: data.attributes.__all__[k].name,
          value: data.attributes.__all__[k].values.map(v => v.value_name).join(', ')
        }))
      };
      res.status(200).json(response(
        product,
        message,
        error
      ));
      return next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};


exports.searchHint = function getAllProducts(req, res, next) {
  if(req.body.key){
    req.query.query = req.body.key;
  }else{
    res.status(200).json(response({records:[]}));
    next();
  }

  axios.get(`${process.env.DATA_SERVER_URL}/data/products-search-hint'`, { params: req.query })
    .then(result => result.data)
    .then(({data, message, error}) => {
      if(data.records.length > 0){
        const key = req.body.key.toLowerCase();
        data.records.sort((a, b)=>{
          return a.toLowerCase().indexOf(key) - b.toLowerCase().indexOf(key);
        });
      }

      res.status(200).json(response(data, message, error));
      return next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};

exports.search = function getAllProducts(req, res, next) {
  const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../dummy-data/products.json'), 'utf8'));
  const search = new RegExp(req.body.query, 'gi');
  const records = products.filter(product => product.name.match(search));

  const data = {
    perPage: parseInt(req.query.perPage, 10) || 12,
    page: parseInt(req.query.page, 10) || 1,
    records: [],
    count: records.length,
    pagesTotal: Math.ceil(records.length / (parseInt(req.query.perPage, 10) || 12)),
    filters: {},
    search: req.body.query
  };
  const from = ( data.page - 1 ) * data.perPage;
  data.records = records.slice(from, from + data.perPage)
    .map(p => (
      {
        id: p.itemId,
        price: {
          retail: toCoins(p.minItemPrice),
          sale: toCoins(p.minItemSalePrice)
        },
        inStore: 24,
        name: p.name,
        attributesInfo: p.attributesInfo,
        image: {
          fs: `http://${process.env.HOST}:${process.env.PORT}/images/products/${p.image}`,
          sm: `http://${process.env.HOST}:${process.env.PORT}/images/products/sm-${p.image}`,
        }
      }
    ));

  res.status(200).json(response(data, '', 0));
  return next();
};
/**
 * Get all users
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.find = function getAllProducts(req, res, next) {
  if(req.query.department){
    req.query.section = req.query.department;
  }
  axios.get(`${process.env.DATA_SERVER_URL}/data/products'`, { params: req.query })
    .then(result => result.data)
    .then(({data, message, error}) => {
      res.status(200).json(response({
        count: parseInt(data.count, 10),
        page: parseInt(data.page, 10),
        pagesTotal: parseInt(data.pagesTotal, 10),
        recPerPage: parseInt(data.recPerPage, 10),
        records: exports.mapListedProducts(data.records),
      }, message, error));
      return next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });

};
