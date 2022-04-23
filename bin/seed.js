'use strict'

const productSeed = require('./productSeed')

const hipsum = require('lorem-hipsum')
const {
  db,
  models: { User, Product, Order },
} = require('../server/db')

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
  let products = await Promise.all(
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

  // Seed some orders
  const bobbieCart = await bobbie.createOrder()
  const amosCart = await amos.createOrder()

  await bobbieCart.addProduct(products[0], { through: { qty: 3, price: 799 } })
  await bobbieCart.addProduct(products[2], { through: { qty: 1, price: 299 } })
  await bobbieCart.addProduct(products[4], { through: { qty: 13, price: 999 } })
  await amosCart.addProduct(products[0], { through: { qty: 3, price: 799 } })
  await amosCart.addProduct(products[2], { through: { qty: 1, price: 299 } })
  await amosCart.addProduct(products[4], { through: { qty: 13, price: 999 } })

  db.close()
  console.log(`Seeding success!`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
