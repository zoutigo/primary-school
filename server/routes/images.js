const { response } = require("express");
const multer = require("multer");
const {
  createImage,
  listImages,
  getImage,
  updateImage,
  deleteImage,
  createImages,
} = require("../controllers/imageControllers");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/images");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
var upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}); //Field name and max count

const router = require("express").Router();

//create one image
router.post("/", upload.single("image"), createImage);

//creta many images
router.post("/multiple", upload.array("images", 15), createImages);

//list images
router.get("/", listImages);

//get image
router.get("/:id", getImage);

// update image
router.put("/:id", updateImage);

// delete image
router.delete("/:id", deleteImage);

module.exports = router;
