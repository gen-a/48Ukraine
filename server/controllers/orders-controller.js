const mongoose = require('mongoose');
const { response } = require('../lib/response');
const { mongooseErrorToResponse } = require('../lib/mongoose-error-to-response');
const Order = require('../models/order-model');
//const Product = require('../models/product-model');
const { sendNewOrderLetter } = require('../letters/send-new-order-letter');

/**
 * Get all orders
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.history = function getAllOrders(req, res, next) {
  const data = {
    perPage: parseInt(req.query.perPage, 10) || 10,
    page: parseInt(req.query.page, 10) || 1,
    records: [],
    count: 0,
    pagesTotal: 0,
    filters: {}
  };


  if (!req.user) {
    res.status(400).json(response({}, 'Not found', 1));
    return next();
  }
  const { email } = req.user;

  Order.find({ email }).skip(data.perPage * ( data.page - 1 )).limit(data.perPage)
    .then((records) => {
      data.records = records;
      return Order.find({ email }).countDocuments();
    })
    .then((count) => {
      data.count = count;
      data.pagesTotal = Math.ceil(count / data.perPage);
      res.status(200).json(response(data));
      next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};


/**
 * Add new order to database
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.add = (req, res, next) => {
  // check product prices
  if (!req.body.products || req.body.products.length === 0) {
    res.status(200).json(response({}, 'orders.error.emptyProductList', 1));
    return next();
  }
  const info = {
    total: 0,
    count: 0,
  };
  req.body.products.forEach(p => {
    info.count += parseInt(p.quantity, 10);
    info.total += parseInt(p.quantity, 10) * parseInt(p.price, 10);
  });
  const order = new Order({
    ...req.body,
    _id: new mongoose.Types.ObjectId(),
    ...info,
    stages: { new: new Date().getTime(), payed: new Date().getTime() }
  });
  order.save()
    .then((result) => {
      sendNewOrderLetter(req.body.email, result.number).then(console.log).catch(console.error);
      res.status(200).json(response(result, 'order.info.theOrderHasBeenPlaced', 0));
      return next();
    })
    .catch((err) => {
      res.status(200).json(mongooseErrorToResponse(err));
      return next();
    });
};