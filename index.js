const { serverPort } = require("./config/server");
const express = require("express");
const { Details, sequelize, Prd ,Role,Cart} = require("./models");
const { categoryRoutes, productRoutes ,authRoutes,cartRoutes} = require("./routes");
const app = express();
// const jwt = require('jsonwebtoken')
app.use(express.json());
app.use(categoryRoutes);
app.use(productRoutes);   
app.use(authRoutes);    
app.use(cartRoutes); 
       
app.listen(serverPort, async () => {
  console.log("server is running on this port", serverPort); 
  await init();  
  // let playload = {id : "hlo i am id", }
  // let secretkey = 'helosksjfsfkjfssfsfhfssd' 
  // let token  = await jwt.sign(playload,secretkey)
  // console.log("token",token)
 }); 
  
async function init() {  
  try { 
    // await sequelize.sync({ force: true }); 
    await sequelize.authenticate()
 
    // const defaultProducts = [ 
    //   {
    //     description: "Nyka best products",
    //     name: "MakeUP Kit",
    //     cost: 870, 
    //     quantity: 20,
    //     DetailId: 1,
    //   },
    //   {
    //   description: "products",
    //   name: "relevel Kit",
    //   cost: 8700,
    //   quantity: 240,
    //   DetailId: 1,
    // },
    //   {
    //     description: "Best fragnance",
    //     name: "Fogg",
    //     cost: 280,
    //     quantity: 20,
    //     DetailId: 2, 
    //   },
    //   {
    //     description: "Best for summer holidays", 
    //     name: "Summer Clothes",  
    //     cost: 1200,
    //     quantity: 20, 
    //     DetailId: 3,  
    //   },    
    // ];  
    
    // const defaultCategories = [
    //   {
    //     name: "Beauty",
    //     model: "All beauty Products",
    //     price: 450,
    //   },
    //   {
    //     name: "Fragnance",
    //     model: "All  Products",
    //     price: 4,
    //   },
    //   {
    //     name: "m-clothes",
    //     model: "All clothes Products",
    //     price: 450,
    //   },
    // ]; 
    // let  defaultRole =[
    //   {
    //     name : "User"
    //   },
    //   {
    //     name : "Admin"
    //   },

    // ];
    // // let defaultCart = [
    // //   {
    // //     cost:120 
    // //   }
    // // ]
    // await Details.bulkCreate(defaultCategories);
    // await Prd.bulkCreate(defaultProducts); 
    // await Role.bulkCreate(defaultRole);
    // await Cart.bulkCreate(defaultCart);
  } catch (err) { 
    console.log(err);
  }    
}  
    