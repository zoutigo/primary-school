const router = require("express").Router();
const { verifyToken } = require("../validators/tokens");
const { checkGradeAndUserExists } = require("../middlewares/controls");
const {
  listChapters,
  getChapter,
  createChapter,
  updateChapter,
  deleteChapter,
} = require("./../controllers/chapterController");

const {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const {
  listRubrics,
  getRubric,
  createRubric,
  updateRubric,
  deleteRubric,
} = require("../controllers/rubricController");

//Categories
router.get("/category", listCategories);
router.get("/category/:id", getCategory);
router.post("/category", verifyToken, createCategory);
router.put("/category/:id", verifyToken, updateCategory);
router.delete("/category/:id", verifyToken, deleteCategory);

//Chapters
router.get("/chapter", listChapters);
router.get("/chapter/:id", getChapter);
router.post("/chapter", verifyToken, checkGradeAndUserExists, createChapter);
router.put("/chapter/:id", updateChapter);
router.delete("/chapter/:id", deleteChapter);

// Rubrics
router.get("/", listRubrics);
router.get("/:id", getRubric);
router.post("/", verifyToken, createRubric);
router.put("/:id", verifyToken, updateRubric);
router.delete("/:id", verifyToken, deleteRubric);

module.exports = router;
