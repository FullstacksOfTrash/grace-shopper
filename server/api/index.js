const router = require('express').Router()

router.use('/auth', require('./auth'));
router.use('/products', require('./product'))
router.use('/user', require('./user'))
router.use('/category', require('./category'))

module.exports = router