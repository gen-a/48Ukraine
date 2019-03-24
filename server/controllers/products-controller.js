const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { response } = require('../lib/response');



const toCoins = value => Math.round(parseFloat(value) * 100);


const mapListedProducts = (products) => {
  return products.map(p => (
    {
      id: p.item_id,
      price: {
        retail: toCoins(p.min_item_price),
        sale: toCoins(p.min_item_sale_price)
      },
      isOnSale: p.min_item_sale_price !== null,
      inStore: parseInt(p.product_in_store_quantity, 10),
      name: p.name,
      attributesInfo: p.attributesInfo,
      image: {
        fs: `http://48ukraine.co${p['image:src']}`,
        sm: `http://48ukraine.co${p['image-sm:src']}`,
      }
    }
  ));
}

exports.findPopular = function findPopular(req, res, next) {
  axios({
    url: 'http://48ukraine.co/data/products-popular',
    method: 'get',
    data: {}
  })
    .then(result => result.data)
    .then((data) => {
      res.status(200).json(response({
        ...data,
        records: mapListedProducts(data.records).map(p => ({ ...p, isPopular: true }))
      }, '', 0));
      return next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};
exports.findNew = function findNew(req, res, next) {
  axios({
    url: 'http://48ukraine.co/data/products-new',
    method: 'get',
    data: {}
  })
    .then(result => result.data)
    .then((data) => {
      res.status(200).json(response({
        ...data,
        records: mapListedProducts(data.records).map(p => ({ ...p, isBrandNew: true }))
      }, '', 0));
      return next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};
exports.findOnSale = function getProductById(req, res, next) {
  axios({
    url: 'http://48ukraine.co/data/products-sale',
    method: 'get',
    data: {}
  })
    .then(result => result.data)
    .then((data) => {
      res.status(200).json(response({
        ...data,
        records: mapListedProducts(data.records)
      }, '', 0));
      return next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};








exports.findById = function getProductById(req, res, next) {
  const product = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../dummy-data/product.json'), 'utf8'));
  const data = {
    ...product,
    images: product.images.map(img =>
      ({
        fs: `https://48ukraine.com${img['image:src']}`,
        md: `https://48ukraine.com${img['image-sm:src']}`,
        sm: `https://48ukraine.com${img['image-sm:src']}`,
      })
    ),
    price: {
      retail: toCoins(product.items[0].price),
      sale: toCoins(product.items[0].sale_price),
    },
    attributes: Object.keys(product.attributes.__all__).map(k => ({
      attribute: product.attributes.__all__[k].name,
      value: product.attributes.__all__[k].values.map(v => v.value_name).join(', ')
    }))
  };
  res.status(200).json(response(data, '', 0));
  return next();

};


exports.searchHint = function getAllProducts(req, res, next) {
  const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../dummy-data/products.json'), 'utf8'));
  const search = new RegExp(req.body.query, 'gi');
  const records = products.filter(product => product.name.match(search)).map(product => product.name);
  res.status(200).json(response({ records }, '', 0));
  return next();
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
  const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../dummy-data/products.json'), 'utf8'));
  const data = {
    perPage: parseInt(req.query.perPage, 10) || 12,
    page: parseInt(req.query.page, 10) || 1,
    records: [],
    count: products.length,
    pagesTotal: Math.ceil(products.length / (parseInt(req.query.perPage, 10) || 12)),
    filters: {}
  };
  const from = ( data.page - 1 ) * data.perPage;
  data.records = products.slice(from, from + data.perPage)
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
