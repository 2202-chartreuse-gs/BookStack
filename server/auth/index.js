const router = require('express').Router()
const { models: {User }} = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;  //deconstruction to prevent SQL injection : Have to check the names of these pieces
    res.send({ token: await User.authenticate({email, password} )});
  } catch (err) {
    next(err)
  }
});


router.post('/signup', async (req, res, next) => {
  try {
    const { firstName, lastName, email, password} = req.body;
    const user = await User.create({ firstName, lastName, email, password});
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/verify', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
