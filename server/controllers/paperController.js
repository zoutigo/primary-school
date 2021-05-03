const Paper = require("../models/Paper");
const Roles = require("../models/Roles");

const {
  PreConditionFailed,
  Unauthorized,
  TokenIvalid,
  BadRequest,
  Forbidden,
  NotFound,
} = require("../utils/errors");
const { fieldsforvalidator } = require("../utils/fieldtoarray");
const { paperValidator } = require("../validators/papers");

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
module.exports.getPapers = async (req, res, next) => {
  const fields = fieldsforvalidator(req.query);
  const errors = paperValidator(fields);

  if (errors.length > 0) {
    return next(new BadRequest(errors));
  }

  try {
    const papers = await Paper.find(req.query);
    papers.length > 0
      ? res.status(200).send(papers)
      : next(new NotFound("paper not found"));
  } catch (err) {
    next(err);
  }
};

module.exports.postPaper = async (req, res, next) => {
  const { grade, roles, _id: userId } = req.user;
  const { id: paperId, action } = req.query;
  const grades = ["manager", "admin", "moderator"];

  if ((Object.keys(req.body).length < 1) & (action !== "delete")) {
    return next(new BadRequest("datas missing"));
  }
  const fields = fieldsforvalidator(req.body);
  const errors = paperValidator(fields);
  if (errors.length > 0) {
    return next(new BadRequest(errors));
  }

  if (action === "create") {
    // case event creation
    const paper = req.body;
    paper.author = userId;
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
  } else if (action === "update" && paperId) {
    // case update

    try {
      let updatedPaper = await Paper.findOneAndUpdate(
        { _id: paperId },
        req.body,
        {
          returnOriginal: false,
        }
      );
      if (updatedPaper) {
        if (process.env.NODE_ENV === "production") {
          return res.status(200).send("paper successfully updated");
        }

        return res.status(200).send(updatedPaper);
      }
    } catch (err) {
      return next(err);
    }
  } else if (action === "delete" && paperId) {
    console.log("action:", action);
    console.log("paperId:", paperId);
    try {
      let deletedPaper = await Paper.findOneAndDelete({ _id: paperId });
      if (deletedPaper) {
        return res.status(200).send("paper deleted successfully");
      }
    } catch (err) {
      return next(err);
    }
  } else {
    return next(new BadRequest("action or paper id missing"));
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

  const fields = fieldsforvalidator(req.body);
  const errors = paperValidator(fields);
  if (errors.length > 0) {
    return res.send(errors);
  }

  if (!paperId) {
    // case paper creation
    const paper = req.body;
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
      let updatedPaper = Paper.findOneAndUpdate({ _id: paperId }, req.body, {
        returnOriginal: false,
      });
      if (updatedPaper) {
        if (process.env.NODE_ENV === "production") {
          return res.status(200).send("paper successfully updated");
        }
        return res.status(200).send("paper successfully updated");
      }
    } catch (err) {
      return next(err);
    }
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
