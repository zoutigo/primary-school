const router = require("express").Router();
const {
  deletePage,
  postPage,
  getPages,
} = require("../controllers/pageController");
const { verifyToken } = require("../validators/tokens");

// Post Pages
router.post("/", verifyToken, postPage);

// get pages
router.get("/:id?", getPages);

// delete page
router.delete("/:id", verifyToken, deletePage);

module.exports = router;
