const router = require('express').Router()
// const { models: { Users }} = require('../db') <- get export format from db
module.exports = router

// GET /api/users/
// Access: Admin only
router.get('/', async (req, res, next) => {
  try {
    const allUsers = await Users.findAll()
    res.send(allUsers)
  } catch (error) {
    next(error)
  }
})

// GET /api/users/:id
// Access: Admin only
// Possible User feature for later tier.
router.get('/:id', async (req, res, next) => {
  try {
    const singleUser = await Users.findByPk(req.params.id)
    singleUser ? res.send(singleUser) : res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})

//POST /api/users
// Access: visitors only if they decide to create an account
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Users.create(req.body))
  } catch (error) {
    next(error)
  }
})

// PUT /api/users/:id
// Access: Specific user only?
// Possible tier 2 feature
// router.put('/:id', async (req, res, next) => {
//   try {
//     const userToEdit = await Users.findByPk(req.params.id)
//     await userToEdit.update(req.body)
//     res.send(userToEdit)
//   } catch (error) {
//     next(error)
//   }
// })

// DELETE /api/user/:id
// Access: Admins only
router.delete('/:id', async (req, res, next) => {
  try {
    const userToDelete = await Users.findByPk(req.params.id)
    await userToDelete.destroy()
    res.send(userToDelete)
  } catch (error) {
    next(error)
  }
})
