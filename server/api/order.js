const router = require('express').Router()
const {
  db,
  models: { User, Product, Order },
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

// PUT /api/order/:id/cart
// Access: User only
router.put('/:id/cart', async (req, res, next) => {
  console.log(req.body)
  const { id, isAdmin } = await User.findByToken(req.headers.authorization)
  //NOTE: qty must be the total quantity from the cart, not the quatity to incriment
  let { userId, product, newQty } = req.body
  console.log(userId, product, newQty)
  // console.log('id and isAdmin : ' + id, isAdmin, +'userId: ' + userId)
  if ((id && isAdmin) || (id && id === userId)) {
    try {
      const usersCart = await Order.findOrCreate({
        where: {
          userId: req.params.id,
          isComplete: false,
        },
        include: {
          model: Product,
          attributes: ['id', 'imageURL', 'productURL', 'title', 'author'],
        },
      })
      await usersCart[0].addProduct(product.id, {
        through: { qty: newQty, price: product.price },
      })
      console.log('usersCart.products: ')
      console.log(usersCart[0].products)
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
