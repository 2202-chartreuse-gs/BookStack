const router = require('express').Router()
const {
  models: { User, Order, Product },
  Order_Products,
} = require('../db')
const { validateToken } = require('./authMiddleware')
module.exports = router

// GET /api/users/
// Access: Admin only
router.get('/', validateToken, async (req, res, next) => {
  try {
    const { isAdmin } = await User.findByToken(req.headers.authorization)
    if (isAdmin !== true) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const allUsers = await User.findAll({
      attributes: [
        'id',
        'email',
        'firstName',
        'lastName',
        'fullName',
        'isAdmin',
      ],
    })
    res.send(allUsers)
  } catch (error) {
    next(error)
  }
})

// GET /api/users/:id/orders
// Access: Admin and specific user
router.get('/:id/orders', async (req, res, next) => {
  try {
    const singleUser = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'email', 'firstName', 'lastName', 'isAdmin'],
    })
    const usersOrder = await Order.findAll({
      where: {
        userId: req.params.id,
        isComplete: true,
      },
      attributes: [],
      include: [
        {
          model: Product,
          attributes: ['id', 'imageURL', 'productURL', 'title', 'author'],
          through: {
            attributes: ['qty', 'price'],
          },
        },
      ],
    })
    if (singleUser) {
      res.send({ user: singleUser, orders: usersOrder })
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

//GET /api/users/:id/cart
router.get('/:id/cart', async (req, res, next) => {
  try {
    const singleUser = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'firstName', 'lastName'],
    })
    const usersCart = await Order.findAll({
      where: {
        userId: req.params.id,
        isComplete: false,
      },
      attributes: [],
      include: [
        {
          model: Product,
          attributes: [
            'id',
            'imageURL',
            'productURL',
            'title',
            'author',
            'price',
          ],
          through: {
            attributes: ['qty'],
          },
        },
      ],
    })
    if (singleUser) {
      res.send({ user: singleUser, cart: usersCart })
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

//POST /api/users
// Access: visitors only if they decide to create an account
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body))
  } catch (error) {
    next(error)
  }
})

// PUT /api/users/:id
// Access: Specific user only
router.put('/:id', async (req, res, next) => {
  try {
    const userToEdit = await User.findByPk(req.params.id)
    await userToEdit.update(req.body)
    res.send(userToEdit)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/user/:id
// Access: Admins only
router.delete('/:id', async (req, res, next) => {
  try {
    const userToDelete = await User.findByPk(req.params.id)
    await userToDelete.destroy()
    res.send(userToDelete)
  } catch (error) {
    next(error)
  }
})
