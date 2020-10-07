const User = require('../models/User')

module.exports.userRegister = async (req, res)=>{
    let user = new User ({
        name: req.body.name ,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role

    })

    try {
        await  user
        .save()
        .then(res.send(`Added in database ${user}`))

    } catch(err){ console.log(err) }

}


module.exports.userView = async (req, res)=>{
    if(!req.params) return res.status(400).send('There is an error in your request')
    
    let user = await User.findOne({_id: req.params.id})
    if(!user) return res.status(400).send('There is no user available')

    return res.status(200).send(`The user is ${user}`)
    
}

module.exports.userModify = async (req, res) =>{
    if(!req.params || !req.body ) return res.status(400).send('There is an error in your request')

    let user = await User.findOneAndUpdate({_id: req.params.id}, req.body)
    if(!user) return res.status(400).send('There is no user available')

    return res.status(200).send(`The user is ${user}`)
}

module.exports.userList = async (req,res) =>{
    let user = await User.find()
    .then((users) => users)
    .catch((err)=> err)

    return res.status(200).send(user)
}