/** Express router providing products related routes
 * @module routes/products-router
 * @requires express
 */
const router = require('express').Router();
const productsController = require('../controllers/products-controller');

/**
 * @api {post} /data/products Load products
 * @apiVersion 1.0.0
 * @apiName /
 * @apiGroup Products
 * @apiPermission anyone
 *
 * @apiParam (Request params)
 *
 * @apiExample {js} Example usage:
 * const data = {}
 *
 * @apiSuccess (Success 200) {String} message ""
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      "message": "",
 *      "data": "{data}"
 *      "error": 0
 *    }
 */
router.get('/', productsController.find);
router.get('/product', productsController.findById);

router.get('/popular', productsController.findPopular);
router.get('/new', productsController.findNew);
router.get('/on-sale', productsController.findOnSale);

router.use('/', (req, res, next) => {});
module.exports = router;
