var express = require('express');
const { userRegister, userView, userModify , userList} = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.get('/list', userList)

//POST user , validation done by admin or moderator
router.post('/', userRegister)

// PUT user
router.put('/:id', userModify)


// GET user
router.get('/:id',userView )

module.exports = router;
