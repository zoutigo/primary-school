const Category = require("../models/Category");
const Chapter = require("../models/Chapter");
const Paper = require("../models/Paper");
const Roles = require("../models/Roles");
const Rubric = require("../models/Rubric");
const {
  PreConditionFailed,
  Unauthorized,
  TokenIvalid,
  BadRequest,
  Forbidden,
  NotFound,
} = require("../utils/errors");
const {
  paperTypeValidator,
  paperContentValidator,
  paperStatusValidator,
  paperTitleValidator,
  paperValidator,
} = require("../validators/papers");

module.exports.listPapers = async (req, res, next) => {
  const { filter } = req.body;
  // put token control for some filters
  try {
    const result = await Paper.find(filter);
    result ? res.send(result) : next(NotFound("not paper found"));
  } catch (err) {
    next(err);
  }
};
module.exports.getPaper = async (req, res, next) => {
  try {
    const paper = await Paper.findOne({ _id: req.params.id });
    paper ? res.send(paper) : next(new NotFound("paper not found"));
  } catch (err) {
    next(err);
  }
};
module.exports.createPaper = async (req, res, next) => {
  const { grade, roles, _id: userId } = req.user;
  const { id: paperId } = req.params;

  const grades = ["manager", "admin", "moderator"];

  // check grade and role
  const isGradAllowed = grades.includes(grade);

  // check user role
  const AllowedRoles = await Roles.find({
    $or: [{ name: "teacher" }, { name: "assistant" }],
  }).select("_id");

  const roleAllowArray = AllowedRoles.filter((role) => roles.includes(role));
  const roleIsAllowed = roleAllowArray.length > 0;

  if (process.NODE_ENV === "production" && (!isGradAllowed || !roleIsAllowed)) {
    return next(new Unauthorized("you are not allowed to update this profile"));
  }

  const paper = {};

  const { type, classroomId, title, text, status, mediaPaths } = req.body;

  if (type) {
    const { error } = await paperValidator({
      type: type,
    });
    if (error) {
      return next(new BadRequest(`${error.details[0].message}`));
    }
    paper.type = type;
  }

  if (title) {
    const { error } = await paperValidator({
      title: title,
    });
    if (error) {
      return next(new BadRequest(`${error.details[0].message}`));
    }
    paper.title = title;
  }

  if (text) {
    const { error } = await paperValidator({
      text: text,
    });
    if (error) {
      return next(new BadRequest(`${error.details[0].message}`));
    }
    paper.text = text;
  }
  if (status) {
    const { error } = await paperValidator({
      status: status,
    });
    if (error) {
      return next(new BadRequest(`${error.details[0].message}`));
    }
    paper.status = status;
  }

  if (classroomId) {
    const { error } = await paperValidator({
      classroomId: classroomId,
    });
    if (error) {
      return next(new BadRequest(`${error.details[0].message}`));
    }
    paper.classroomId = classroomId;
  }

  if (!paperId) {
    // case paper creation

    paper.authorId = userId;
    let newPaper = new Paper(paper);
    try {
      let savedPaper = await newPaper.save();
      if (savedPaper) {
        if (process.env.NODE_ENV === "production") {
          return res.status(201).send("paper successfully created");
        }
        return res.status(201).send(savedPaper);
      }
    } catch (err) {
      return next(err);
    }
  } else {
    // case update
    try {
      let updatedPaper = Paper.findOneAndUpdate({ _id: paperId }, paper, {
        returnOriginal: false,
      });
      if (updatedPaper) {
        if (process.env.NODE_ENV === "production") {
          return res.status(200).send("paper successfully updated");
        }
        return res.status(200).send("hello");
      }
    } catch (err) {
      return next(err);
    }
  }
};
module.exports.updatePaper = async (req, res, next) => {
  const { role, _id } = req.user;

  const roles = ["moderator", "admin"];
  const updatedPaper = {};

  try {
    let paper = await Paper.findOne({ _id: req.params.id });
    if (paper) {
      roles.includes(role)
        ? null
        : next(new Unauthorized("operation not allowed"));
    } else {
      next(new NotFound("paper not found"));
    }
  } catch (err) {
    next(err);
  }

  const {
    paper_rubric_id,
    paper_category_id,
    paper_chapter_id,
    paper_type,
    paper_title,
    paper_content,
    paper_status,
    paper_media,
  } = req.body;

  if (
    !paper_rubric_id &&
    !paper_category_id &&
    !paper_chapter_id &&
    !paper_type &&
    !paper_title &&
    !paper_content &&
    !paper_status &&
    !paper_media
  ) {
    next(new BadRequest("at least one field should be to update"));
  }

  if (paper_rubric_id) {
    try {
      const newPaperRubric = await Rubric.findOne({ _id: paper_rubric_id });
      newPaperRubric
        ? (updatedPaper.paper_rubric_id = paper_rubric_id)
        : next(new NotFound("Rubric not found"));
    } catch (err) {
      next(err);
    }
  }

  if (paper_category_id) {
    try {
      const newPaperCategory = await Category.findOne({
        _id: paper_category_id,
      });
      newPaperCategory
        ? (updatedPaper.paper_category_id = paper_category_id)
        : next(new NotFound("category not found"));
    } catch (err) {
      next(err);
    }
  }

  if (paper_chapter_id) {
    try {
      const newPaperChapter = await Chapter.findOne({
        _id: paper_chapter_id,
      });
      newPaperChapter
        ? (updatedPaper.paper_chapter_id = paper_chapter_id)
        : next(new NotFound("Chapter not found"));
    } catch (err) {
      next(err);
    }
  }

  if (paper_type) {
    const { error } = await paperTypeValidator({
      paper_type: paper_type,
    });
    error
      ? next(new BadRequest(`${error.details[0].message}`))
      : (updatedPaper.paper_type = paper_type);
  }

  if (paper_title) {
    const { error } = await paperTitleValidator({
      paper_title: paper_title,
    });
    error
      ? next(new BadRequest(`${error.details[0].message}`))
      : (updatedPaper.paper_title = paper_title);
  }

  if (paper_content) {
    const { error } = await paperContentValidator({
      paper_content: paper_content,
    });
    error
      ? next(new BadRequest(`${error.details[0].message}`))
      : (updatedPaper.paper_content = paper_content);
  }

  if (paper_status) {
    const { error } = await paperStatusValidator({
      paper_status: paper_status,
    });
    error
      ? next(new BadRequest(`${error.details[0].message}`))
      : (updatedPaper.paper_status = paper_status);
  }

  try {
    let savedUpdatedPaper = await Paper.findOneAndUpdate(
      { _id: req.params.id },
      updatedPaper,
      { returnOriginal: false }
    );
    if (savedUpdatedPaper) {
      res.send(savedUpdatedPaper);
    }
  } catch (err) {
    next(err);
  }
};
module.exports.deletePaper = async (req, res, next) => {
  const { role, _id } = req.user;
  const roles = ["moderator", "admin"];

  try {
    let paper = await Paper.findOne({ _id: req.params.id });
    if (paper) {
      if (paper.paper_author_id === _id || roles.includes(role)) {
        let deletedPaper = await Paper.deleteOne({ _id: req.params.id });
        if (deletedPaper) {
          res.status(200).send("paper was deleted");
        }
      } else {
        next(new Unauthorized("operation not allowed"));
      }
    } else {
      next(new NotFound("paper not found"));
    }
  } catch (err) {
    next(err);
  }
};
