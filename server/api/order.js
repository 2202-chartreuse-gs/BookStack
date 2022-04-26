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
    res.send(usersPurchases)
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
router.put('/:id/cart', async (req, res, next) => {
  const user = await User.findByToken(req.headers.authorization)
  const { userId, product, qty } = req.body
  if (user.isAdmin || user.id === userId) {
    try {
      const usersCart = await Order.findAll({
        where: {
          userId: req.params.id,
          isComplete: false,
        },
      })
      usersCart.addProduct(product, { through: { qty } })
      res.send(usersCart)
    } catch (error) {
      next(error)
    }
  } else {
    return res.status(401).json({ error: 'Unauthorized' })
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
