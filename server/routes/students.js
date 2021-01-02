const router = require("express").Router();
const {
  createStudent,
  listStudents,
  readStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");
const { verifyToken } = require("../validators/tokens");

// Get student list
router.get("/list", verifyToken, listStudents);

// Create astudent
router.post("/create", verifyToken, createStudent);

// Read a student
router.get("/read/:id", verifyToken, readStudent);

// Update a student
router.put("/update/:id", verifyToken, updateStudent);

// Delete a student
router.delete("/delete/:id", verifyToken, deleteStudent);

module.exports = router;
