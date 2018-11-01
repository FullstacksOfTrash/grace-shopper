const router = require('express').Router()
const { Image } = require('../db')

// mounted on /api/images

router.get('/:productId', (req, res, next)=> {
  Image.findAll({
    where: {
      productId: req.params.productId
    }
  })
    .then(images => res.send(images))
    .catch(next);
});

module.exports = router;