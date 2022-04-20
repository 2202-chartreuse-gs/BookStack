//this is the access point for all things database related!
const Sequelize = require('sequelize')
const db = require('./db')

const User = require('./models/User')
const Order = require('./models/Order')
const Product = require('./models/Product')

User.hasMany(Order)
Order.belongsTo(User)

const Order_Products = db.define('Order_Products', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 999,
  },
})

Product.belongsToMany(Order, { through: 'Order_Products' })
Order.belongsToMany(Product, { through: 'Order_Products' })

module.exports = {
  db,
  models: {
    User,
    Order,
    Product,
  },
}
