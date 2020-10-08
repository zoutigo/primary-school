const User = require('../models/User')
const {registerValidator} =require('../validators/users')
const bcrypt = require('bcrypt')

module.exports.userRegister = async (req, res)=>{
   

    // using Joi validator
   let validate = await registerValidator(req.body)
   if (validate.error) return res.status(400).send(`${validate.error.details[0].message}`)

   // check if email exist in database
   let emailVerif = await User.findOne({email:req.body.email})
   if (emailVerif) return res.status(400).send(`The email ${req.body.email} already exist in database`)

   // password hash
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(req.body.password, salt)

 
    let user = new User ({
        name: req.body.name ,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
        firstname: req.body.firstname
    })

    try {
        const savedUser = await  user.save()
        res.status(200).send({user: user._id })

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