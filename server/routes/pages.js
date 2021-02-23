const {
  listPages,
  deletePage,
  updatePage,
  createPage,
} = require("../controllers/pageController");
const { verifyToken } = require("../validators/tokens");
const router = require("express").Router();

// create page
router.post("/", verifyToken, createPage);

// update page
router.put("/:id", verifyToken, updatePage);

// delete page
router.delete("/:id", verifyToken, deletePage);

// list pages
router.get("/", listPages);

module.exports = router;
