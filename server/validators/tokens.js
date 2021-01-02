const jwt = require("jsonwebtoken");
const { BadRequest, Unauthorized, TokenIvalid } = require("../utils/errors");

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

module.exports.verifyToken = async (req, res, next) => {
  // const token = req.header('auth-token')

  const token = req.headers["x-access-token"];
  if (!token) throw new Unauthorized("Access denied");

  try {
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified) throw new TokenIvalid("Invalid Token");
    req.user = verified;
    next();
  } catch (err) {
    next(err);
  }
};
