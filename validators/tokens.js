// const jwt = require('jsonwebtoken')

// module.exports.validToken = (token)=>{
   
//     //let token = req.header('auth-token')
//     if (!token) return res.status(400).send('Access denied') 
    
//     try {
//      const verified = jwt.verify(token, process.env.TOKEN_SECRET)
//      //return res.send(verified)
//      req.user = verified
    
 
//      } catch(err) {
//          res.status(400).send(err)
//      }
// }


const jwt = require('jsonwebtoken')
    module.exports= (req, res, next) =>{
        const token = req.header('auth-token')
        if(!token) return res.status(400).send('Access denied')

        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = verified
            next()
        } catch(err) {
        res.status(400).send('Invalid TOKEN')
        }
        
    }
