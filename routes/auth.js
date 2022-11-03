let express = require('express')
let {singnUp,singnIn} =require('../controller/auth')
let {checkDuplicateUser} = require('../middleware')
let routes = express.Router()
routes.post("/ecom/singup",[checkDuplicateUser],singnUp)
routes.post("/ecom/singIn",singnIn)
module.exports = {authRoutes:routes}