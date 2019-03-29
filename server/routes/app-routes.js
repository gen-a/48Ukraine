/** Express router providing auth related routes
 * @module routes/auth-router
 * @requires express
 */
const router = require('express').Router();
const appController = require('../controllers/app-controller');
/**
 * @api {post} /data/app/initial-state Load initial state data
 * @apiVersion 1.0.0
 * @apiName InitialState
 * @apiGroup App
 * @apiPermission anyone
 *
 * @apiParam (Request body) {String} Object {locale}
 *
 * @apiExample {js} Example usage:
 * const data = {
 *   "locale": "uk"
 * }
 *
 * @apiSuccess (Success 200) {String} message ""
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      "message": "auth.error.missing_email",
 *      "data": "{data}"
 *      "error": 1
 *    }
 */
router.get('/initial-state', appController.initialState);

router.post('/store-cart', appController.storeCart);

router.use('/', (req, res, next) => {});

module.exports = router;
