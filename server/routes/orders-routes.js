const router = require('express').Router();

const orderController = require('../controllers/orders-controller');

router.post('/add', orderController.add);

router.get('/history', orderController.history);

router.get('/addresses', orderController.addresses);

router.use('/', (req, res, next) => {});
module.exports = router;
