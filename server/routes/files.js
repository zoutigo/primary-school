const fileUpload = require("express-fileupload");

const router = require("express").Router();
const { getFiles, postFile } = require("../controllers/fileController");
const { verifyToken } = require("../validators/tokens");

router.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
  })
);

router.get("/:id?/:type?", getFiles);

// router.post("/:id?", verifyToken, postFile);
router.post("/:id?", verifyToken, postFile);

module.exports = router;
