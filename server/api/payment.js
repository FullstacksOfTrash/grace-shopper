const { key2 } = require('../../apiKeys')
const stripe = require('stripe')(key2)
const router = require('express').Router()


router.post('/charge', async (req, res, next) => {
	console.log(req.body)
	try {
		const { status } = await stripe.charges.create({
			amount: 2200,
			currency: "usd",
			description: 'an ex charge',
			source: req.body
		})
		console.log(status)
		res.send({ status })
	} catch (err) {
		console.log(err)
		res.status(500).end()
	}
})

module.exports = router