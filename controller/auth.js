const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

let { User ,Cart} = require("../models");

async function singnUp(req, res) {
  let username = req.body.username;
  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password, 8);

  console.log("password", password);

  try {
    let user = await User.create({ username, email, password });
	await Cart.create({id: user.id})
    if (req.body.roles) {
      let roles = req.body.roles;
      let result = await user.setRoles(roles);
      console.log("user define roles", result);
    } else {
      let result = await user.setRoles([1]);
      console.log("default role", result);
    }
    res.send({ msg: "User has been created successfully" });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server error" });
  }
}
async function singnIn(req,res){
	const username = req.body.username;
	const password = req.body.password;

	try{
		const user = await User.findOne({
			where : {
				username : username
			}
		})
		if(user){
			const validPassword = bcrypt.compareSync(password,user.password)
			if(!validPassword){
				res.status(400).send({msg : 'Username/password is not correct'})	
			}

			const token = await jwt.sign({id : user.id}, process.env.JWT_SECRET_KEY, {
				expiresIn: '1h'
			})

			const authorities = [];
			const roles = await user.getRoles();
			for(let i=0; i<roles.length;i++){
				authorities.push(roles[i].name)
			}

			const finalUser = {
				id: user.id,
				name: user.name, 
				email: user.email,
				username:user.username,
				token: token,
				authorities: authorities
			}

			res.send(finalUser)
		
		}else{
			res.status(400).send({msg : 'Username/password is not correct'})	
		}
	}catch(err){
		res.status(500).send({msg : 'Internal Server Error', err})
	}
}
module.exports = { singnUp, singnIn };
