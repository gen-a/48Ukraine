const path = require('path');
const fs = require('fs');
const { response } = require('../lib/response');


const toCoins = value => Math.round(parseFloat(value) * 100);


exports.findById = function getProductById(req, res, next) {
  const product = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../dummy-data/product.json'), 'utf8'));
  const data = {
    ...product,
    images: product.images.map( img =>
      ({
        fs:`https://48ukraine.com${img['image:src']}`,
        md:`https://48ukraine.com${img['image-sm:src']}`,
        sm:`https://48ukraine.com${img['image-sm:src']}`,
      })
    ),
    price: {
      retail: toCoins(product.items[0].price),
      sale: toCoins(product.items[0].sale_price),
    },
    attributes: Object.keys(product.attributes.__all__).map(k => ({
        attribute:product.attributes.__all__[k].name,
        value: product.attributes.__all__[k].values.map( v => v.value_name).join(', ')
      }))
  };
  res.status(200).json(response( data, '', 0));
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
  const from = ( data.page-1 ) * data.perPage;
  data.records = products.slice(from, from + data.perPage)
    .map( p => (
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
          fs: `http://127.0.0.1:3000/images/products/${p.image}`,
          sm: `http://127.0.0.1:3000/images/products/sm-${p.image}`,
        }
      }
    ));

  res.status(200).json(response( data, '', 0));
  return next();
};
