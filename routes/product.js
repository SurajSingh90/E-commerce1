let express = require('express')

let {createProduct,getProduct,filterPrd, getProductOnId ,updateProduct,deleteProduct} = require('../controller/product')
let {verifyToken,isAdmin} = require('../middleware')
let routes = express.Router()



routes.post('/ecom/api/v1/products', createProduct)
routes.get('/ecom/api/v1/products',[verifyToken],[isAdmin],getProduct)
// routes.get('/ecom/api/v1/filter', filterPrd)
routes.get('/ecom/api/v1/products/:name', getProductOnId)
routes.put('/ecom/api/v1/products/:id', updateProduct)
routes.delete('/ecom/api/v1/products/:id', deleteProduct)

// module.exports = {productRoutes:routes}

module.exports = {productRoutes: routes} 