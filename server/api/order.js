const router = require('express').Router()
const {
  models: { Order },
} = require('../db')
module.exports = router

// Cart route
// GET /api/order/:id/cart
// Access: User only
router.get('/:id/cart', async (req, res, next) => {
  try {
    const usersCart = await Order.findAll({
      where: {
        userId: req.params.id,
        isComplete: false,
      },
    })
    res.send(usersCart)
  } catch (err) {
    next(err)
  }
})
// Order history route
// GET /api/order/:id
// Access: User only
router.get('/:id', async (req, res, next) => {
  try {
    const usersPurchases = await Order.findAll({
      where: {
        userId: req.params.id,
        isComplete: true,
      },
    })
    res.send(usersCart)
  } catch (error) {
    next(error)
  }
})

// POST /api/cart/
// Access: system process
// router.post('/', async (req, res, next) => {
//   try {
//     res.status(201).send(await Cart.create(req.body))
//   } catch (error) {
//     next(error)
//   }
// })

// PUT /api/cart/:id
// Access: User only
router.put('/:id', async (req, res, next) => {
  try {
    const cartToEdit = await Cart.findByPk(req.params.id)
    await cartToEdit.update(req.body)
    res.send(cartToEdit)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/cart/:id
// Access: system process
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const cartToDelete = await Cart.findByPk(req.params.id)
//     await cartToDelete.destroy()
//     res.send(cartToDelete)
//   } catch (error) {
//     next(error)
//   }
// })

//
