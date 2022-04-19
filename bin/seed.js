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
    fName: 'Bobbie',
    lName: 'Draper',
    isAdmin: false,
    email: 'draper@roci.com',
    password: pw123,
  })
  const alex = await User.create({
    fName: 'Alex',
    lName: 'Kamal',
    isAdmin: false,
    email: 'kamal@roci.com',
    password: pw123,
  })
  const james = await User.create({
    fName: 'James',
    lName: 'Holden',
    isAdmin: false,
    email: 'holden@roci.com',
    password: pw123,
  })
  const camina = await User.create({
    fName: 'Camina',
    lName: 'Drummer',
    isAdmin: false,
    email: 'drummer@trade.gov',
    password: pw123,
  })
  const miller = await User.create({
    fName: 'Joe',
    lName: 'Miller',
    isAdmin: false,
    email: 'miller@ceres.com',
    password: pw123,
  })
  const amos = await User.create({
    fName: 'Amos',
    lName: 'Burton',
    isAdmin: false,
    email: 'burton@roci.com',
    password: pw123,
  })
  const naomi = await User.create({
    fName: 'Naomi',
    lName: 'Nagata',
    isAdmin: true,
    email: 'nagata@roci.com',
    password: pw123,
  })
  const john = await User.create({
    fName: 'John',
    lName: 'Sprague',
    isAdmin: true,
    email: 'john@bookstack.com',
    password: pw123,
  })
  const teman = await User.create({
    fName: 'Teman',
    lName: 'Beck',
    isAdmin: true,
    email: 'teman@bookstack.com',
    password: pw123,
  })
  const mike = await User.create({
    fName: 'Michael',
    lName: 'Mnatsakanian',
    isAdmin: true,
    email: 'mike@bookstack.com',
    password: pw123,
  })
  const justin = await User.create({
    fName: 'Justin',
    lName: 'Duplain',
    isAdmin: true,
    email: 'justin@bookstack.com',
    password: pw123,
  })

  //Seeds the carts
  await Cart.create({ items: { 1: 5, 3: 1 }, userId: 1 })
  await Cart.create({ items: { 1: 2, 2: 5, 3: 99 }, userId: 2 })
  await Cart.create({ items: { 5: 5 }, userId: 3 })
  await Cart.create({ items: { 4: 2, 2: 7 }, userId: 4 })
  await Cart.create({ items: {}, userId: 5 })

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
