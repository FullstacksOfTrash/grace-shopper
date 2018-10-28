const router = require('express').Router()

router.use('/auth', require('./auth'));
router.use('/products', require('./products'), require('./reviews'))
router.use('/users', require('./users'))
router.use('/categories', require('./categories'))
router.use('/orders', require('./orders'))

// router.use('/reviews', require('./review'))

module.exports = router