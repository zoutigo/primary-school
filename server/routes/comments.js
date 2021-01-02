const router = require("express").Router();
const {
  createComment,
  listItemComments,
  updateComment,
  deleteComment,
  readComment,
} = require("../controllers/commentController");
const { verifyToken } = require("../validators/tokens");

// Get comments list
router.get("/list/:itemId", verifyToken, listItemComments);

// Create a comment
router.post("/create/:itemId", verifyToken, createComment);

// Read a comment
router.get("/read/:itemId/:id", verifyToken, readComment);

// Update a comment (just the like)
router.put("/update/:itemId/:id", verifyToken, updateComment);

// Delete a comment
router.delete("/delete/:itemId/:id", verifyToken, deleteComment);

module.exports = router;
