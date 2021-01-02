var express = require("express");
const {
  userRegister,
  userView,
  userModify,
  userList,
  userLogin,
} = require("../controllers/userController");
const { verifyToken } = require("../validators/tokens");
var router = express.Router();

/* GET users listing. */
router.get("/list", verifyToken, userList);

//POST user , validation done by admin or moderator
router.post("/", userRegister);

// PUT user , only when user is already logged
router.put("/:id", userModify);

// GET user
router.get("/:id", userView);

// User Login
router.post("/login", userLogin);

module.exports = router;
