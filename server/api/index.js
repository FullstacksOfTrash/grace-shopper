const router = require('express').Router()
const product = require('./products')
const user = require('./user')
const category = require('./category')

router.use('/products', product)
router.use('/user', user)
router.use('/category', category)

module.exports = router