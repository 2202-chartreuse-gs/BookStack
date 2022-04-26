const router = require('express').Router()
const {
  models: { Product, User },
} = require('../db')
const { validateToken } = require('./authMiddleware')
module.exports = router

// GET /api/products/
// Access: All users
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      attributes: ['id', 'title', 'author', 'price', 'imageURL'],
    })
    res.send(allProducts)
  } catch (error) {
    next(error)
  }
})

// GET /api/products/:id
// Access: All users
router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id)
    singleProduct ? res.send(singleProduct) : res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})

//POST /api/products
// Access: Admins only
router.post('/', validateToken, async (req, res, next) => {
  try {
    console.log("testing to visit, see you soon hopefully ")
    const { isAdmin } = await User.findByToken(req.headers.authorization)
    if (isAdmin !== true) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    res.status(201).send(await Product.create(req.body))
  } catch (error) {
    next(error)
  }
})

// PUT /api/products/:id
// Access: Admins only
router.put('/:id', validateToken, async (req, res, next) => {
  try {
    const { isAdmin } = await User.findByToken(req.headers.authorization)
    if (isAdmin !== true) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const product = await Product.findByPk(req.params.id)
    await product.update(req.body)
    res.send(product)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/products/:id
// Access: Admins only
router.delete('/:id', validateToken, async (req, res, next) => {
  try {
    const { isAdmin } = await User.findByToken(req.headers.authorization)
    if (isAdmin !== true) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const product = await Product.findByPk(req.params.id)
    await product.destroy()
    res.send(product)
  } catch (error) {
    next(error)
  }
})
