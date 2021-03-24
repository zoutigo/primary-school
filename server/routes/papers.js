const router = require("express").Router();
const { verifyToken } = require("../validators/tokens");
const {
  listPapers,
  getPapers,
  createPaper,

  deletePaper,
} = require("../controllers/paperController");

// router.get("/", listPapers);
router.get("/:id?/:type?/:entity?/:status?", getPapers);
router.post("/:id?", verifyToken, createPaper);

router.delete("/:id", verifyToken, deletePaper);

module.exports = router;
