let { Prd } = require("../models");

async function createProduct(req, res) {
  const productData = req.body;

//   if (!productData.name && productData.cost && productData.quantity ) {
//     res.status(400).send({ msg: "Name , cost qun is missing" });
//   }
  try {
    let name = productData.name;
    let cost = productData.cost;
    let description = productData.description;

    let quantity = productData.quantity;

    let DetailId = productData.DetailId


    let result = await Prd.create({ name, cost, description, quantity,DetailId });
    res.send({ msg: "product got created", result });
  } catch (err) {
    res.status(500).send({ msg: "internal server error", err });
  }
}      

async function getProduct(req, res) {
  try {
    let result = await Prd.findAll();
    res.send(result);
  } catch (err) {
    res.status(500).send({ msg: "internal server error", err });
  }
}

async function getProductOnId(req, res) {
  let productId = req.params.name;
  try {
    let result = await Prd.findOne({
      where: {
        name: productId,
      },
    });
    res.send(result);
  } catch (err) {
    res.status(500).send({ msg: "internal server error", err });
  }
}

async function updateProduct(req, res) {
  let productData = req.body;
  let productId = req.params.id;

  if (
    !(
      productData.name &&
      productData.cost &&
      productData.quantity &&
      productData.description
    )
  ) {
    res
      .status(400)
      .send({ msg: "Name, Cost, Quantity & description is missing" });
  }

  try {
    let name = productData.name;
    let description = productData.description;
    let cost = productData.cost;
    let quantity = productData.quantity;

    let product = await Prd.findOne({
      where: { id: productId },
    });
    if (product) {
      product.name = name;
      product.cost = cost;
      product.description = description;
      product.quantity = quantity;

      product.save();

      res.send({ msg: "product got updated successfully" });
    } else {
      res.status(400).send({ msg: "product id does not exist" });
    }
  } catch (err) {
    console.log("err", err);
    res.status(500).send({ msg: "Internal server error", err });
  } 
}
async function deleteProduct(req,res){
	const productId = req.params.id;
	try{
		await Prd.destroy({
			where: {id:productId}
		})

		res.send({msg: "product delete successfully"})
	}catch(err){
		res.status(500).send({msg: 'Internal server error',err})
	} 
}

module.exports = {
  createProduct,
  getProduct,
  getProductOnId,
  updateProduct,
  deleteProduct
};
