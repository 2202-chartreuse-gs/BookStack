const router = require('express').Router()
// const { models: { User }} = require('../db') <- get export format from db
module.exports = router

// GET /api/products/
// Access: All users
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Products.findAll()
    res.send(allProducts)
  } catch (error) {
    next(error)
  }
})

// GET /api/products/:id
// Access: All users
router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Products.findByPk(req.params.id)
    singleProduct ? res.send(singleProduct) : res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})

//POST /api/products
// Access: Admins only
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Products.create(req.body))
  } catch (error) {
    next(error)
  }
})

// PUT /api/products/:id
// Access: Admins only
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Products.findByPk(req.params.id)
    await product.update(req.body)
    res.send(product)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/products/:id
// Access: Admins only
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Products.findByPk(req.params.id)
    await product.destroy()
    res.send(product)
  } catch (error) {
    next(error)
  }
})
