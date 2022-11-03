const { categoryRoutes } = require('./category')
const { productRoutes }= require('./product')
let {authRoutes} = require('./auth')
let { cartRoutes} = require('./cart')
module.exports = {
	categoryRoutes,
	productRoutes,
	authRoutes,
	cartRoutes
} 