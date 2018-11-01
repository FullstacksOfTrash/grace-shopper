const router = require('express').Router()
const { Category, Product } = require('../db')

// route : /api/categories

// adds a product to a category
router.post('/:id', (req, res, next) => {
	Category.findById(req.params.id)
		.then(category => category.addProduct(req.body))   //assuming req.body is an object
		.then(updated => res.send(updated))        //assuming addProduct methods returns the updated category
		.catch(next)
})

router.get('/:id', (req, res, next) => {        //finds specific category and includes products related to it
	Category.findById(req.params.id, {
		include: [Product]
	})
		.then(data => res.send(data))
		.catch(next)
})

router.get('/', (req, res, next) => {
	Category.findAll()
		.then(categories => res.send(categories))
		.catch(next)
})

router.post('/', (req, res, next) => {
	Category.create(req.body)
		.then(newCategory => res.send(newCategory))
		.catch(next)
})


module.exports = router

