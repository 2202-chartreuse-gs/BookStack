const hipsum = require('lorem-hipsum')
const { db, User, Product, Cart } = require('../server/db')
import productSeed from './productSeed.js'

const productDetails = () =>
  hipsum({
    count: 1,
    units: 'paragraphs',
    paragraphLowerBound: 3,
    paragraphUpperBound: 15,
    format: 'plain',
  })

const seed = async () => {
  await db.sync({ force: true })

  //Seeds the products
  await Promise.all(
    productSeed.map((product) => {
      return Product.create({ ...product, description: productDetails() })
    })
  )

  //Seeds the users
  const bobbie = await User.create({
    firstName: 'Bobbie',
    lastName: 'Draper',
    isAdmin: false,
    email: 'draper@roci.com',
    password: 'pw123',
  })
  const alex = await User.create({
    firstName: 'Alex',
    lastName: 'Kamal',
    isAdmin: false,
    email: 'kamal@roci.com',
    password: 'pw123',
  })
  const james = await User.create({
    firstName: 'James',
    lastName: 'Holden',
    isAdmin: false,
    email: 'holden@roci.com',
    password: 'pw123',
  })
  const camina = await User.create({
    firstName: 'Camina',
    lastName: 'Drummer',
    isAdmin: false,
    email: 'drummer@trade.gov',
    password: 'pw123',
  })
  const miller = await User.create({
    firstName: 'Joe',
    lastName: 'Miller',
    isAdmin: false,
    email: 'miller@ceres.com',
    password: 'pw123',
  })
  const amos = await User.create({
    firstName: 'Amos',
    lastName: 'Burton',
    isAdmin: false,
    email: 'burton@roci.com',
    password: 'pw123',
  })
  const naomi = await User.create({
    firstName: 'Naomi',
    lastName: 'Nagata',
    isAdmin: true,
    email: 'nagata@roci.com',
    password: 'pw123',
  })
  const john = await User.create({
    firstName: 'John',
    lastName: 'Sprague',
    isAdmin: true,
    email: 'john@bookstack.com',
    password: 'pw123',
  })
  const teman = await User.create({
    firstName: 'Teman',
    lastName: 'Beck',
    isAdmin: true,
    email: 'teman@bookstack.com',
    password: 'pw123',
  })
  const mike = await User.create({
    firstName: 'Michael',
    lastName: 'Mnatsakanian',
    isAdmin: true,
    email: 'mike@bookstack.com',
    password: 'pw123',
  })
  const justin = await User.create({
    firstName: 'Justin',
    lastName: 'Duplain',
    isAdmin: true,
    email: 'justin@bookstack.com',
    password: 'pw123',
  })

  //Seeds the carts
  const bobbieCart = await bobbie.createCart([
    { productId: 1, qty: 3 },
    { productId: 3, qty: 1 },
  ])
  const alexCart = await alex.createCart([
    { productId: 1, qty: 2 },
    { productId: 2, qty: 5 },
    { productId: 3, qty: 99 },
  ])
  const jamesCart = await james.createCart([{ productId: 5, qty: 5 }])
  const caminaCart = await camina.createCart([
    { productId: 4, qty: 2 },
    { productId: 2, qty: 7 },
  ])
  const millerCart = await miller.createCart()

  db.close()
  console.log(`Seeding success!`)
}

seed().catch((err) => {
  db.close()
  console.log(`
      Error seeding:
      ${err.message}
      ${err.stack}
    `)
})
