const router = require('express').Router()
const product = require('./product')
const user = require('./user')
const category = require('./category')

router.use('/product', product)
router.use('/user', user)
router.use('/category', category)

module.exports = router