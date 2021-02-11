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
router.get("/categories", listCategories);
router.get("/categories/:id", getCategory);
router.post("/categories", verifyToken, createCategory);
router.put("/categories/:id", verifyToken, updateCategory);
router.delete("/categories/:id", verifyToken, deleteCategory);

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
