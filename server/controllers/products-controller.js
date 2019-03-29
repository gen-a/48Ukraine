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
    .then(({ data, message, error }) => {
      res.status(200).json(response({
        ...data,
        records: exports.mapListedProducts(data.records).map(p => ({ ...p, isPopular: true }))
      }, message, error));
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
    .then(({ data, message, error }) => {
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
    .then(({ data, message, error }) => {
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

  axios.get(`${process.env.DATA_SERVER_URL}/data/product`, { params: req.query })
    .then(result => result.data)
    .then(({ data, message, error }) => {

      const attr = data.attributes['__all__'];


      const product = {
        ...data,
        images: data.images.map(img => ({
          fs: `${process.env.DATA_SERVER_URL}${img['image:src']}`,
          md: `${process.env.DATA_SERVER_URL}${img['image-sm:src']}`,
          sm: `${process.env.DATA_SERVER_URL}${img['image-sm:src']}`,
        })),
        price: {
          retail: toCoins(data.items[0].price),
          sale: toCoins(data.items[0].sale_price),
        },
        attributes: attr
          ? Object.keys(attr).map(k => ({
            attribute: attr[k].name,
            value: attr[k].values.map(v => v.value_name).join(', ')
          }))
          : []
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

/**
 * Get all users
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.find = function getAllProducts(req, res, next) {
  if (req.query.department) {
    req.query.section = req.query.department;
  }
  axios.get(`${process.env.DATA_SERVER_URL}/data/products`, { params: req.query })
    .then(result => result.data)
    .then(({ data, message, error }) => {
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
