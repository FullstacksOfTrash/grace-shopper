const router = require('express').Router()

const product = require('./product')
const user = require('./user')
const category = require('./category')


router.use('/auth', require('./auth'));


module.exports = router