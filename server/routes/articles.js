const router = require("express").Router();
const {
  listArticlesByCategory,
  readArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");
const { verifyToken } = require("../validators/tokens");

// List articles by type
router.get("/list/:category", listArticlesByCategory);

// read  article
router.get("/read/:id", readArticle);

// create aricle
router.post("/create", verifyToken, createArticle);

// update artcle
router.put("/update/:id", verifyToken, updateArticle);

// delete article
router.delete("/delete/:id", verifyToken, deleteArticle);

module.exports = router;
