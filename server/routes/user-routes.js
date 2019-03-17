const router = require('express').Router();
const { checkUserInRequest } = require('../lib/middlewares/check-user-in-request');
const { checkRequiredInBody } = require('../lib/middlewares/check-required-in-body');
const usersController = require('../controllers/users-controller');

router.put('/profile', checkUserInRequest, usersController.updateProfile);
router.put('/password', checkUserInRequest, checkRequiredInBody(['password']), usersController.updatePassword);
router.get('/profile', checkUserInRequest, usersController.profile);

module.exports = router;
