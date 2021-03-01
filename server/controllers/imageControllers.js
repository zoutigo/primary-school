const Image = require("../models/Image");
const { BadRequest } = require("../utils/errors");

module.exports.createImage = async (req, res, next) => {
  const { filename, path } = req.file;

  const newImage = new Image({
    filename: filename,
    path: path,
  });

  try {
    const savedImage = await newImage.save();
    if (savedImage) {
      const location = `${process.env.SERVER_ADRESS}/${savedImage.path}`;
      return res.status(201).send({ location: location });
    }
  } catch (err) {
    return next(err);
  }
};
module.exports.createImages = async (req, res, next) => {
  const locations = [];
  for (let i = 0; i < req.files.length; i++) {
    const { filename, path } = req.files[i];
    const newImage = new Image({
      filename: filename,
      path: path,
    });

    const savedImage = await newImage.save();
    if (savedImage) {
      const location = `${process.env.SERVER_ADRESS}/${savedImage.path}`;
      locations.push({ location: location });
    }
  }
  res.status(201).send(locations);
};
module.exports.listImages = (req, res, next) => {};
module.exports.getImage = (req, res, next) => {};
module.exports.updateImage = (req, res, next) => {};
module.exports.deleteImage = (req, res, next) => {};
