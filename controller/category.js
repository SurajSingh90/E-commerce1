let {Details} = require('../models')

async function createCategory(req,res){
    const data = req.body;

    
    let name = data.name;
    let model = data.model;
    let price = data.price

    try{
         const result = await Details.create({name,model,price})
         console.log(result)
         res.send({msg : 'Category has been created'})
    }
    catch(err){
		console.log('err in creation of categories', err)
		res.status(500).send({msg : 'Internal server error'})
	}
}
async function getAllCategory(req, res){
	try{
		const result = await Details.findAll()
		res.send(result)
	}catch(err){
		console.log('err in getting categories', err)
		res.status(500).send({msg : 'Internal server error'})
	}
}

async function getCategoryId(req,res){
    const categoryId= req.params.id;

    try{
            const result = await Details.findOne({
                where:{
                    id:categoryId
                }
            })
            res.send(result)
    }catch(err){
            console.log('err in id',err)
            res.status(500).send({msg: 'internal server'})
    }
}

async function updateCategory(req,res){
	const categoryId = req.params.id;
	try{
		const result = await Details.findOne({
			where : {
				id : categoryId
			}
		})
		 if(result){
			result.name = req.body.name;
			result.model = req.body.model;
            result.price = req.body.price;

			result.save()

			res.send({msg : 'category got update', 
			updatedCategory: result})
		 }else {
			console.log('err in getting categories', err)
			res.status(400).send({msg : 'category id does not exist'})
		 }
	}catch(err){
		console.log('err in getting categories', err)
		res.status(500).send({msg : 'Internal server error'})
	}
}
async function deleteCategory(req,res){
	const categoryId = req.params.id;
	try{
		const result = await Details.destroy({
			where :{
				id: categoryId
			}
		})

		res.send({msg: 'catrgory deleted', result})
	}catch(err){
		console.log('err in deleting categories', err)
		res.status(500).send({msg : 'Internal server error'})
	}
}

module.exports ={
    createCategory ,
    getAllCategory,
    getCategoryId,
    updateCategory,
    deleteCategory
}