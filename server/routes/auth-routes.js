const router = require('express').Router();
const authController = require('../controllers/auth-controller');

router.post('/email', authController.email);

module.exports = router;
