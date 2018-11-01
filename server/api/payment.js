const { key2 } = require('../../apiKeys')
const stripe = require('stripe')(key2)
const router = require('express').Router()


router.post('/charge', async (req, res, next) => {
    const { tokenId, sum, cartId } = req.body
    console.log(tokenId, sum, cartId)
    try {
        const { status } = await stripe.charges.create({
            amount: (sum * 100), 
            currency: "usd",
            description: cartId,
            source: tokenId
        })
        // console.log(status)
        res.send({status})
    } catch(err){
        // console.log(err)
        res.status(500).end()
    }
})

module.exports = router