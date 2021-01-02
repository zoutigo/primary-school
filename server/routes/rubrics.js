const router = require("express").Router();
const {
  listChapters,
  getChapter,
  createChapter,
  updateChapter,
  deleteChapter,
} = require("./../controllers/chapterController");

// Rubrics

//Categories

//Chapters
router.get("/chapter", listChapters);
router.get("/chapter/:id", getChapter);
router.post("/chapter", createChapter);
router.put("/chapter/:id", updateChapter);
router.delete("/chapter/:id", deleteChapter);

module.exports = router;
