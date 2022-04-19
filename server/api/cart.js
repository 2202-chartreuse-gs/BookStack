const router = require('express').Router()
// const { models: { User }} = require('../db') <- get export format from db
module.exports = router

// GET /api/cart/:id
// Access: User only
router.get('/:id', async (req, res, next) => {
  try {
    const usersCart = await Cart.findByPk(req.params.id)
    res.send(usersCart)
  } catch (err) {
    next(err)
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
