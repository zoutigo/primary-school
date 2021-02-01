const Chapter = require("../models/Chapter");
const { chapterValidator } = require("../validators/chapters");
const {
  PreConditionFailed,
  Unauthorized,
  TokenIvalid,
  BadRequest,
  Forbidden,
} = require("../utils/errors");

module.exports.createChapter = async (req, res, next) => {
  const { grade, _id } = req.user;
  const { id } = req.params;
  const datas = {};
  const newChapter = new Chapter();

  // check if req.body is empty
  if (Object.keys(req.body).length === 0) {
    return next(new BadRequest("missing datas "));
  }

  // validate datas
  const { name } = req.body;
  if (!name) next(new BadRequest("missing datas"));

  // validate chapter name
  if (name) {
    const { error } = await chapterValidator({ name: name });
    if (error) {
      return next(new BadRequest(`${error.details[0].message}`));
    }
    newChapter.name = name;
  }

  //insert in database

  try {
    const newChapterSaved = await newChapter.save();
    if (!newChapterSaved) return next();
    return res.status(201).send(newChapterSaved);
  } catch (err) {
    return next(err);
  }
};
module.exports.listChapters = async (req, res, next) => {
  try {
    let chapters = await Chapter.find();
    if (!chapters) return next(new NotFound("not found chapter"));
    return res.status(200).send(chapters);
  } catch (err) {
    return next(err);
  }
};
module.exports.getChapter = async (req, res, next) => {
  try {
    let chapter = await Chapter.findOne({ _id: req.params.id });
    if (!chapter) return next(new NotFound("not existing chapter"));
    return res.status(200).send(chapter);
  } catch (err) {
    return next(err);
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
  const { grade, _id } = req.user;
  const { id } = req.params;
  const datas = {};

  // check user grade
  const grades = ["admin", "manager"];
  if (!grades.includes(grade))
    return next(new Forbidden("forbidden operation"));

  // check if user exists
  try {
    let user = await User.findOne({ _id: _id });
    if (!user) {
      return next(new Forbidden("user does not exist"));
    }
    datas.user = user;
  } catch (err) {
    return next(err);
  }
  // delete in database

  try {
    let deletedChapter = await Chapter.findOneAndDelete({ _id: req.params.id });
    if (!deletedChapter) return next(new NotFound("not found chapter"));
    return res.status(200).send(`${req.params.id} chapter have been deleted`);
  } catch (err) {
    next(err);
  }
};
