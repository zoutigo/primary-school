const {
  getFiles,
  postFile,
  deleteFile,
} = require("../controllers/fileController");
const { verifyToken } = require("../validators/tokens");

const router = require("express").Router();

router.get("/:id?/:type?", getFiles);

router.post("/:id?", verifyToken, postFile);

router.delete("/:id", verifyToken, deleteFile);

module.exports = router;
