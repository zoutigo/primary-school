const router = require("express").Router();
const { verifyToken } = require("../validators/tokens");
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

// Rubrics

//Categories
router.get("/category", listCategories);
router.get("/category/:id", getCategory);
router.post("/category", verifyToken, createCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

//Chapters
router.get("/chapter", listChapters);
router.get("/chapter/:id", getChapter);
router.post("/chapter", createChapter);
router.put("/chapter/:id", updateChapter);
router.delete("/chapter/:id", deleteChapter);

module.exports = router;
