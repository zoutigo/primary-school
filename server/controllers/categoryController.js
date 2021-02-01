const Category = require("../models/Category");
const Chapter = require("../models/Chapter");
const User = require("../models/User");
const {
  categoryNameValidator,
  categoryValidator,
} = require("../validators/categories");

const {
  PreConditionFailed,
  Unauthorized,
  TokenIvalid,
  BadRequest,
  Forbidden,
  NotFound,
} = require("../utils/errors");

module.exports.listCategories = async (req, res, next) => {
  try {
    let categories = await Category.find();
    if (!categories) return next(new NotFound(`No category found`));
    return res.status(200).send(categories);
  } catch (err) {
    return next(err);
  }
};

module.exports.getCategory = async (req, res, next) => {
  try {
    let category = await Category.findOne({ _id: req.params.id });
    if (!category) return next(new NotFound(`No category found`));
    return res.status(200).send(category);
  } catch (err) {
    return next(err);
  }
};

module.exports.createCategory = async (req, res, next) => {
  const { grade, _id } = req.user;
  const newCategory = new Category();

  // check grade
  const grades = ["admin", "manager"];
  if (!grades.includes(grade)) {
    return next(new Forbidden("forbidden operation"));
  }

  // check if user still exists
  try {
    const user = await User.findOne({ _id: _id });
    if (!user) {
      return next(new Unauthorized("user doesnt exit"));
    }
  } catch (err) {
    return next(err);
  }
  // check if req.body is empty
  if (Object.keys(req.body).length === 0) {
    return next(new BadRequest("missing datas "));
  }

  // validate datas
  const { name, chapters } = req.body;
  if (!name) next(new BadRequest("missing datas"));

  // validate category name
  if (name) {
    const { error } = await categoryValidator({ name: name });
    if (error) {
      return next(new BadRequest(`${error.details[0].message}`));
    }
    newCategory.name = name;
  }

  // insert in database
  try {
    const newCategorySaved = await newCategory.save();
    if (!newCategorySaved) return next();
    return res.status(201).send(newCategorySaved);
  } catch (err) {
    return next(err);
  }
};

module.exports.updateCategory = async (req, res, next) => {
  const { grade, _id } = req.user;
  const { id } = req.params;
  const datas = {};
  const newCategory = {};

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

  // check if req.body is empty
  if (Object.keys(req.body).length === 0) {
    return next(new BadRequest("missing datas "));
  }
  // check if category exists
  try {
    const category = await Category.findOne({ _id: id });
    if (!category) return next(new NotFound("Category does not exists"));
    datas.category = category;
  } catch (err) {
    return next(new BadRequest(err));
  }

  // fieds validation
  const { name, chapters } = req.body;

  // name validation
  if (name && !name === datas.category.name) {
    const { error } = await categoryValidator({ name: name });
    if (error) {
      return next(new BadRequest(`${error.details[0].message}`));
    }
    newRubric.name = name;
  }

  // chapters validation
  if (
    chapters &&
    !(JSON.stringify(chapters) === JSON.stringify(datas.category.chapters))
  ) {
    const { error } = await categoryValidator({ chapters: chapters });
    if (error) {
      return next(new BadRequest(`${error.details[0].message}`));
    }
    let newChapters = {};
    switch (action) {
      case "add-chapters":
        newChapters = datas.category.chapters;
        chapters.forEach((chapter) => {
          if (!newChapters.includes(chapter)) {
            newChapters.push(chapter);
          }
        });
        break;
      case "remove-chapters":
        newChapters = datas.category.chapters.filter((chapter) => {
          !chapters.includes(chapter);
        });
        break;

      default:
        return next(
          new BadRequest(
            "missing category action:add-chapters, remove-chapters"
          )
        );
    }
  }
  newCategory.chapters = newChapters;

  // insersion in database
  if (Object.keys(newCategory).length > 0) {
    try {
      let updatedCategory = await Category.findOneAndUpdate(
        { _id: id },
        newCategory,
        { returnOriginal: false }
      );

      if (!updatedCategory) return next();
      return res.status(200).send(updatedCategory);
    } catch (err) {
      return next(err);
    }
  }
};

module.exports.deleteCategory = async (req, res, next) => {
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
    let deletedCategory = await Category.findOneAndDelete({
      _id: id,
    });

    if (!deletedCategory) return next(new NotFound("not existing category"));
    return res.status(200).send(`${req.params.id} category have been deleted`);
  } catch (err) {
    next(err);
  }
};
