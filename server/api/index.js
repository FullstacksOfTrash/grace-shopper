const router = require('express').Router()

router.use('/auth', require('./auth'));
router.use('/products', require('./products'))
router.use('/user', require('./user'))
router.use('/category', require('./category'))
router.use('/reviews', require('./review'))

module.exports = router