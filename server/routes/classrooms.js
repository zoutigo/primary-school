const router = require("express").Router();
const {
  listClassrooms,

  createClassroom,
  updateClassroom,
  deleteClassroom,
  getClassroom,
} = require("../controllers/classroomController");
const { verifyToken } = require("../validators/tokens");

router.get("/", listClassrooms);

router.get("/:filter", getClassroom);

router.post("/", verifyToken, createClassroom);

router.put("/:id", verifyToken, updateClassroom);

router.delete("/:id", verifyToken, deleteClassroom);

module.exports = router;
