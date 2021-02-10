const router = require("express").Router();
const { verifyToken } = require("../validators/tokens");
const {
  listRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");

// list roles
router.get("/", listRoles);

// get role
router.get("/:id", getRole);

// create role
router.post("/", verifyToken, createRole);

// update role
router.put("/:id", verifyToken, updateRole);

// delete role
router.delete("/:id", verifyToken, deleteRole);

module.exports = router;
