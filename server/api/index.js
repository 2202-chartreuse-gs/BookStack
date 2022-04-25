const router = require('express').Router()
module.exports = router

// USE api/
router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/order', require('./order'))


// general 404 error handler
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
