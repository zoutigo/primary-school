const router = require("express").Router();
const {
  listClassrooms,

  createClassroom,
  updateClassroom,
  deleteClassroom,
  getClassroomById,
} = require("../controllers/classroomController");
const { verifyToken } = require("../validators/tokens");

router.get("/", listClassrooms);

router.get("/:id", getClassroomById);

router.post("/", verifyToken, createClassroom);

router.put("/:id", verifyToken, updateClassroom);

router.delete("/:id", verifyToken, deleteClassroom);

module.exports = router;
