const { Cart, Prd } = require("../models");
async function updateCart(req, res) {
  let cartId = req.params.id;
  try {
    let cart = await Cart.findByPk(cartId);

    if (cart) {
      const productIds = req.body.productIds;
      const products = await Prd.findAll({
        where: {
          id: productIds,
        },
      });
      
      if (products.length > 0) {
        await cart.setPrds(products);
        let cartprd = await cart.getPrds()
        let totalcost = 0;
        const addprd = [];
        for(i=0;i<cartprd.length;i++){
          totalcost = totalcost+cartprd[i].cost
          addprd.push({
            ids : cartprd[i].id,
            names : cartprd[i].name,
            cost : cartprd[i].cost,
            des: cartprd[i].description,
          
          })
        }
        res.send({totalcost,addprd});
      }
    } else {
      res.status(400).send({ msg: "cart not exist" });
    }
  } catch (err) {
    res.status(500).send({ msg: "Internal server error", err });
    console.log(err)
  }
}

module.exports = {
  updateCart,
};
