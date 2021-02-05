const Category = require("../models/Category");
const Rubric = require("../models/Rubric");
const User = require("../models/User");
const {
  PreConditionFailed,
  BadRequest,
  Forbidden,
  NotFound,
  Unauthorized,
} = require("../utils/errors");
const { rubricValidator } = require("../validators/rubrics");

module.exports.listRubrics = async (req, res, next) => {
  try {
    let rubrics = await Rubric.find();
    if (!rubrics) return res.status(204);
    return res.status(200).send(rubrics);
  } catch (err) {
    return next(err);
  }
};
module.exports.getRubric = async (req, res, next) => {
  const { error } = rubricValidator({ id: req.params.id });
  if (error) return next(new BadRequest("fake id"));
  try {
    let rubric = await Rubric.findOne({ _id: req.params.id });
    if (!rubric) {
      return res.status(204);
    }

    return res.status(200).send(rubric);
  } catch (err) {
    return next(err);
  }
};
module.exports.createRubric = async (req, res, next) => {
  const { grade, _id } = req.user;
  const grades = ["admin"];
  if (!grades.includes(grade)) {
    return next(new Unauthorized("unautorized operation"));
  }

  const { name } = req.body;

  if (!name) return next(new BadRequest("missing datas"));

  const { error, value } = await rubricValidator({ name: name });
  if (error) return next(new BadRequest(`${error.details[0].message}`));

  try {
    const newRubric = new Rubric({ name: name });
    const newRubricSaved = await newRubric.save();
    if (!newRubricSaved) return next();
    return res.status(201).send(newRubricSaved);
  } catch (err) {
    return next(err);
  }
};
module.exports.updateRubric = async (req, res, next) => {
  const { grade, _id } = req.user;
  const { id } = req.params;
  const datas = {};
  const newRubric = {};

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

  if (id) {
    // check if rubric id is correct format
    const { error } = await rubricValidator({ id: id });
    if (error) return next(new BadRequest(`${error.details[0].message}`));
    // check if rubric exists
    try {
      const rubric = await Rubric.findOne({ _id: id });
      if (!rubric) return next(new NotFound("Rubric does not exists"));
      datas.rubric = rubric;
    } catch (err) {
      return next(new BadRequest(err));
    }
  }

  // check if req.body is empty
  if (Object.keys(req.body).length === 0) {
    return next(new BadRequest("missing datas "));
  }

  // fieds validation
  const { name, categories, action, images, alias } = req.body;

  // name validation
  if (name) {
    if (name !== datas.rubric.name) {
      const { error } = await rubricValidator({ name: name });
      if (error) {
        return next(new BadRequest(`${error.details[0].message}`));
      }
    }
    newRubric.name = name;
  }

  // categories validation
  if (categories) {
    const { error } = await rubricValidator({ categories: categories });
    if (error) {
      return next(new BadRequest(`${error.details[0].message}`));
    }

    if (action === "remove-categories") {
      const newCategories = datas.rubric.categories.filter((category) => {
        return categories.includes(category);
      });

      newRubric.categories = newCategories;
    } else if (action === "add-categories") {
      const newCategories = datas.rubric.categories;
      categories.forEach((category) => {
        newCategories.push(category);
      });

      newRubric.categories = newCategories;
    } else {
      return next(new BadRequest("missing category action"));
    }
  }
  // insertion in database
  try {
    let savedRubric = await Rubric.findOneAndUpdate({ _id: id }, newRubric, {
      returnOriginal: false,
    });
    if (!savedRubric) return next();
    return res.status(200).send(savedRubric);
  } catch (err) {
    return next(err);
  }
};

module.exports.deleteRubric = async (req, res, next) => {
  const { grade, _id } = req.user;
  const { id } = req.params;

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
    let deletedRubric = await Rubric.findOneAndDelete({ _id: req.params.id });

    if (!deletedRubric) return next(new NotFound("not existing rubric"));
    return res.status(200).send(`${req.params.id} rubric have been deleted`);
  } catch (err) {
    return next(err);
  }
};
