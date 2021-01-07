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
const {
  paperTypeValidator,
  paperContentValidator,
  paperStatusValidator,
  paperTitleValidator,
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
  const { role, _id } = req.user;
  const roles = ["teacher", "moderator", "admin"];
  if (!roles.includes(role)) {
    return next(new PreConditionFailed("forbidden operation"));
  }
  const postedPaper = {};
  postedPaper.paper_author_id = _id;

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

  !paper_rubric_id &&
    !paper_category_id &&
    !paper_chapter_id &&
    next(new BadRequest("one paper parent is mandatory"));

  if (paper_rubric_id) {
    try {
      const newPaperRubric = await Rubric.findOne({ _id: paper_rubric_id });
      newPaperRubric
        ? (postedPaper.paper_rubric_id = paper_rubric_id)
        : next(new BadRequest("Invalid paper rubric"));
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
        ? (postedPaper.paper_category_id = paper_category_id)
        : next(new BadRequest("Invalid paper category id"));
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
        ? (postedPaper.paper_chapter_id = paper_chapter_id)
        : next(new BadRequest("Invalid paper chapter id"));
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
      : (postedPaper.paper_type = paper_type);
  } else {
    next(new BadRequest("Missing paper type"));
  }

  if (paper_title) {
    const { error } = await paperTitleValidator({
      paper_title: paper_title,
    });
    error
      ? next(new BadRequest(`${error.details[0].message}`))
      : (postedPaper.paper_title = paper_title);
  } else {
    next(new BadRequest("Missing paper title"));
  }

  if (paper_content) {
    const { error } = await paperContentValidator({
      paper_content: paper_content,
    });
    error
      ? next(new BadRequest(`${error.details[0].message}`))
      : (postedPaper.paper_content = paper_content);
  } else {
    next(new BadRequest("Missing paper content"));
  }
  if (paper_status) {
    const { error } = await paperStatusValidator({
      paper_status: paper_status,
    });
    error
      ? next(new BadRequest(`${error.details[0].message}`))
      : (postedPaper.paper_status = paper_status);
  } else {
    next(new BadRequest("Missing paper status"));
  }
  postedPaper.paper_createdAt = Date.now();

  try {
    let newPaper = new Paper(postedPaper);
    let savedNewPaper = await newPaper.save();
    if (savedNewPaper) {
      res.send(savedNewPaper);
    }
  } catch (err) {
    next(err);
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
