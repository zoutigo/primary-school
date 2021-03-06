var express = require("express");
const {
  userRegister,
  userView,
  userModify,
  userList,
  userLogin,
  userEmail,
  usersTeamGet,
} = require("../controllers/userController");
const { verifyToken } = require("../validators/tokens");
var router = express.Router();

// get the team

router.get("/team", usersTeamGet);

// check email
router.post("/checkemail", userEmail);

/* GET users listing. */
router.get("/list", userList);

//POST user , validation done by admin or moderator
router.post("/", userRegister);

// PUT user , only when user is already logged
router.put("/:id", verifyToken, userModify);

// GET user
router.get("/:id", userView);

// User Login
router.post("/login", userLogin);

module.exports = router;
