let express = require('express')
let { updateCart } = require('../controller/cart')
let routes = express.Router()

routes.put("/ecom/cart/:id", updateCart)
module.exports = {cartRoutes:routes}