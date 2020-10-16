var express = require('express');
const { userRegister, userView, userModify , userList, userLogin} = require('../controllers/userController');
const verifToken = require('../validators/tokens')
var router = express.Router();

/* GET users listing. */
router.get('/list', verifToken, userList)

//POST user , validation done by admin or moderator
router.post('/', verifToken, userRegister)

// PUT user , only when user is already logged
router.put('/:id', userModify)


// GET user
router.get('/:id',userView )

// User Login
router.post('/login', userLogin)

module.exports = router;
