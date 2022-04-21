const router = require('express').Router()
const {
  models: { User },
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
      attributes: ['id', 'email']
    })
    res.send(allUsers)
  } catch (error) {
    next(error)
  }
})

// GET /api/users/:id
// Access: Admin and specific user
router.get('/:id', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id)
    singleUser ? res.send(singleUser) : res.sendStatus(404)
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
