const router = require("express").Router();
const {
  createUsers,
  createClassrooms,
  updateClassrooms,
  createRoles,
  updateUsers,
} = require("../controllers/datasController");

router.post("/users", createUsers);
router.put("/users", updateUsers);
router.post("/classrooms", createClassrooms);
router.post("/roles", createRoles);
router.put("/classrooms", updateClassrooms);

module.exports = router;
