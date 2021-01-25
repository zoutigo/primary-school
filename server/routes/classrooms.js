const router = require("express").Router();
const {
  listClassrooms,
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom,
} = require("../controllers/classroomController");
const { verifyToken } = require("../validators/tokens");

router.get("/", listClassrooms);

router.get("/:id", getClassroom);

router.post("/", verifyToken, createClassroom);

router.put("/:id", verifyToken, updateClassroom);

router.delete("/:id", verifyToken, deleteClassroom);

module.exports = router;
