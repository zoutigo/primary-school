const AWS = require("aws-sdk");
const uuid = require("uuid");
const Image = require("../models/Image");
const { BadRequest, NotFound } = require("../utils/errors");
const fileUploadService = require("../service/upload");

module.exports.createPageImage = async (req, res, next) => {
  try {
    if (req.files && req.files.file) {
      const file = req.files.file;
      const {
        fileUrl: location,
        filename,
      } = await fileUploadService.uploadFileToAws(file);
      const newImage = new Image({
        filename: filename,
        path: location,
      });

      try {
        const savedImage = await newImage.save();
        if (savedImage) {
          return res.status(201).send({ location: location });
        }
      } catch (err) {
        return next(err);
      }
    }
    return next(new NotFound("FILE_NOT_FOUND"));
  } catch (error) {
    return next(error);
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
