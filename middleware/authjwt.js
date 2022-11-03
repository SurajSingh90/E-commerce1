const jwt = require('jsonwebtoken');
const {User} = require('../models')
async function verifyToken(req,res,next){
	const token = req.headers['x-access-token'];

	if(token){
		try{
			const result = jwt.verify(token, process.env.JWT_SECRET_KEY)
			if(result){
				req.userId = result.id;
				next()
			}else{
				res.status(400).send({msg : 'auth token has expired. Please relogin'})
				return;
			}
		}catch(err){
			res.status(400).send({msg : 'auth token has expired. Please relogin'})
			return;	
		}
	}else{
		res.status(401).send({msg : 'auth token is missing'})
		return;
	}
}

async function isAdmin(req,res,next){
	const userId = req.userId;
	try{
		const user = await User.findBypk(userId)
		// console.log(user)
		const userRole = await user.getRoles();
		// console.log(userRole)
		for(let i = 0; i< userRole.length; i++){
			if(userRole[i].dataValues.name === 'Admin'){
				next()
				return;
			}
		}
		res.status(400).send({msg : 'User does not have admin access'})
		return;

	}catch(err){
		res.status(500).send({msg:'error internel server'})
	}







}
	

module.exports = {verifyToken,isAdmin}