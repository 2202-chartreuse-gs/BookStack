//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Cart = require('./models/Cart')
const Product = require('./models/Product')

//associations
User.hasMany(Product)
Product.belongsToMany(User)

Cart.hasMany(Product)
Product.belongsToMany(Cart)

User.hasOne(Cart)
Cart.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Cart,
    Product,
  },
}
