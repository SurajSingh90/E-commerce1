let {User} = require('../models')
// const  = require('../models/user')

async function checkDuplicateUser(req,res,next){
    if(req.body.username){
        let user = await User.findOne({
            where : {
                username:req.body.username
            }
            
        })
        if(user){
            res.status(400).send({msg:'username already '})
            return;
        }

    }

    if(req.body.email){
		const user = await User.findOne({
			where : {
				email:req.body.email
			}
		})

		if(user){
			res.status(400).send({msg : 'email already exist'})
			return;
		}
	}

	next()

}
// async function checkRolee(req,res,next){

// }

module.exports ={
    checkDuplicateUser,
    // checkRolee
}