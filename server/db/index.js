//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Order = require('./models/Order')
const Product = require('./models/Product')

//associations

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(Product)
Product.belongsToMany(Order, { through: 'Order_Products' })

module.exports = {
  db,
  models: {
    User,
    Order,
    Product,
  },
}
