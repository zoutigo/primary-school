const {
  listPages,
  deletePage,
  updatePage,
  createPage,
  getPage,
} = require("../controllers/pageController");
const { verifyToken } = require("../validators/tokens");
const router = require("express").Router();

// create page
router.post("/", verifyToken, createPage);

// get page
router.get("/:filter", getPage);

// update page
router.put("/:id", verifyToken, updatePage);

// delete page
router.delete("/:id", verifyToken, deletePage);

// list pages
router.get("/", listPages);

module.exports = router;
