async function checkName(req,res,next){
    let categoriesData = req.body;
    if(!categoriesData.name){
        res.status(400).send({'msg':'name si comp'})
        return;
    }
    next()
}

module.exports = {
    checkName
}