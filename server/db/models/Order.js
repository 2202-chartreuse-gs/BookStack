const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  isComplete: {
    type: Sequelize.BOOLEAN,
  },
})

module.exports = Order
