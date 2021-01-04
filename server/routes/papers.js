const router = require("express").Router();
const { verifyToken } = require("../validators/tokens");
const {
  listPapers,
  getPaper,
  createPaper,
  updatePaper,
  deletePaper,
} = require("../controllers/paperController");

router.get("/", listPapers);
router.get("/:id", getPaper);
router.post("/", verifyToken, createPaper);
router.put("/:id", verifyToken, updatePaper);
router.delete("/:id", verifyToken, deletePaper);

module.exports = router;
