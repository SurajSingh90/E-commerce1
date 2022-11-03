let express = require('express')

let { createCategory ,getAllCategory,getCategoryId, updateCategory,deleteCategory} = require('../controller/category')
let {checkName,verifyToken} = require('../middleware') 
let routes = express.Router()

routes.post('/ecomm/api/v1/categories',[checkName],createCategory)
routes.get('/ecom/api',getAllCategory)
routes.get('/ecom/api/:id',getCategoryId)
routes.put('/ecom/api/:id',updateCategory)
routes.delete('/ecom/api/:id',deleteCategory)

module.exports = {categoryRoutes : routes}