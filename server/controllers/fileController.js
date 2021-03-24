const File = require("../models/File");
const { fieldsforvalidator } = require("../utils/fieldtoarray");
const { fileValidator } = require("../validators/files");
const { BadRequest, NotFound } = require("../utils/errors");

module.exports.getFiles = async (req, res, next) => {
  const fields = fieldsforvalidator(req.query);
  const errors = fileValidator(fields);

  if (errors.length > 0) {
    return next(new BadRequest(errors));
  }

  try {
    const file = await File.find(req.query);
    file.length > 0
      ? res.status(200).send(file)
      : next(new NotFound("file not found"));
  } catch (err) {
    next(err);
  }
};
module.exports.postFile = async (req, res, next) => {
  const { grade, roles, _id: userId } = req.user;
  const { id: fileId } = req.query;
  const grades = ["manager", "admin", "moderator"];

  const fields = fieldsforvalidator(req.body);
  const errors = fileValidator(fields);
  if (errors.length > 0) {
    return next(new BadRequest(errors));
  }

  const newFile = new File(req.body);

  if (!fileId) {
    // file creation
    // upload file
    console.log("files", req.files);
    try {
      if (req.files && req.files.file) {
        const file = req.files.file;
        const {
          fileUrl: location,
          filename,
        } = await fileUploadService.uploadFileToAws(file);
        newFile.url = location;
        newFile.author = userId;

        try {
          const savedFile = await newFile.save();
          if (savedFile) {
            return res.status(201).send("file created");
          }
        } catch (err) {
          return next(err);
        }
      } else {
        return next(new NotFound("FILE_NOT_FOUND"));
      }
    } catch (err) {
      return next(err);
    }
  } else {
    // file update
    if (req.files && req.files.file) {
      const file = req.files.file;
      const {
        fileUrl: location,
        filename,
      } = await fileUploadService.uploadFileToAws(file);
      newFile.url = location;

      // should delete previous file from aws or public folder

      try {
        const savedFile = await newFile.save();
        if (savedFile) {
          return res.status(200).send("file updated");
        }
      } catch (err) {
        return next(err);
      }
    } else {
      // only save File without upload
      try {
        const savedFile = await newFile.save();
        if (savedFile) {
          return res.status(200).send("file updated");
        }
      } catch (err) {
        return next(err);
      }
    }
  }
};
module.exports.deleteFile = async (req, res, next) => {};
