const Category = require("../models/Category");
const Chapter = require("../models/Chapter");
const Paper = require("../models/Paper");
const Rubric = require("../models/Rubric");
const {
  PreConditionFailed,
  Unauthorized,
  TokenIvalid,
  BadRequest,
  Forbidden,
  NotFound,
} = require("../utils/errors");
const { paperTypeValidator } = require("../validators/papers");

module.exports.listPapers = async (req, res, next) => {
  res.send("list papers");
};
module.exports.getPaper = async (req, res, next) => {
  res.send("get paper");
};
module.exports.createPaper = async (req, res, next) => {
  const { role, _id } = req.user;
  const roles = ["teacher", "moderator", "admin"];
  if (!roles.includes(role)) {
    next(new PreConditionFailed("forbidden operation"));
  }

  const {
    paper_rubric,
    paper_category,
    paper_chapter,
    paper_type,
    paper_content,
    paper_author,
    paper_status,
    paper_media,
  } = req.body;
  const postedPaper = {};

  !paper_rubric &&
    !paper_category &&
    !paper_chapter &&
    next(new BadRequest("one paper parent is mandatory"));

  if (paper_rubric) {
    try {
      const newPaperRubric = await Rubric.findOne({ rubic_name: paper_rubric });
      newPaperRubric && (postedPaper.paper_rubric = paper_rubric);
    } catch (err) {
      next(err);
    }
  }

  if (paper_category) {
    try {
      const newPaperCategory = await Category.findOne({
        category_name: paper_category,
      });
      newPaperCategory && (postedPaper.paper_category = paper_category);
    } catch (err) {
      next(err);
    }
  }

  if (paper_chapter) {
    try {
      const newPaperChapter = await Chapter.findOne({
        chapter_name: paper_chapter,
      });
      newPaperChapter && (postedPaper.paper_chapter = paper_chapter);
    } catch (err) {
      next(err);
    }
  }

  if (paper_type) {
    const { error } = await paperTypeValidator({
      paper_type: paper_type,
    });
    error && next(new BadRequest(`${error.details[0].message}`));
    postedPaper.paper_type = paper_type;
  } else {
    next(new BadRequest("Missing paper type"));
  }
};
module.exports.updatePaper = async (req, res, next) => {
  res.send("update paper");
};
module.exports.deletePaper = async (req, res, next) => {
  res.send("delete paper");
};
