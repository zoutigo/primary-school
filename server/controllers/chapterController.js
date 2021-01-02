const Chapter = require("../models/Chapter");
const {
  PreConditionFailed,
  Unauthorized,
  TokenIvalid,
  BadRequest,
  Forbidden,
} = require("../utils/errors");

module.exports.createChapter = async (req, res, next) => {
  const { chapter_name } = req.body;
  if (chapter_name.length < 2) {
    next(new BadRequest("tres court"));
  }
  try {
    let chapter = new Chapter({
      chapter_name: chapter_name,
    });

    let newChapter = await chapter.save();

    res
      .status(200)
      .send(`new chapter ${chapter_name} created with id: ${newChapter._id}`);
  } catch (error) {
    next(error);
  }
};
module.exports.listChapters = async (req, res, next) => {
  try {
    let chapters = await Chapter.find();

    chapters && chapters.length > 0
      ? res.status(200).send(chapters)
      : next(new NotFound("not existing chapter"));
  } catch (err) {
    next(err);
  }
};
module.exports.getChapter = async (req, res, next) => {
  try {
    let chapter = await Chapter.findOne({ _id: req.params.id });
    chapter
      ? res.status(200).send(chapter)
      : next(new NotFound("not existing chapter"));
  } catch (err) {
    next(err);
  }
};
module.exports.updateChapter = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };

    let updatedChapter = await Chapter.findOneAndUpdate(filter, req.body, {
      returnOriginal: false,
    });
    if (updatedChapter) {
      res.status(200).send(`chapter updated: ${updatedChapter}`);
    }
    throw new BadRequest("not existing chapter");
  } catch (err) {
    next(err);
  }
};
module.exports.deleteChapter = async (req, res, next) => {
  try {
    let deletedChapter = await Chapter.findOneAndDelete({ _id: req.params.id });
    !deletedChapter
      ? next(new NotFound("not existing chapter"))
      : res.status(200).send(`${req.params.id} have been deleted`);
  } catch (err) {
    next(err);
  }
};
