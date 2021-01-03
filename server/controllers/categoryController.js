const Category = require("../models/Category");
const Chapter = require("../models/Chapter");
const User = require("../models/User");
const { categoryNameValidator } = require("../validators/categories");

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
    let categories = await categories.find();
    categories && categories.length > 0
      ? res.status(200).send(categories)
      : next(new NotFound(`No category existing`));
  } catch (err) {
    next(err);
  }
};

module.exports.getCategory = async (req, res, next) => {
  try {
    let category = await category.find({ _id: req.body.id });
    category
      ? res.status(200).send(category)
      : next(new NotFound("Not existing category"));
  } catch (err) {
    next(err);
  }
};

module.exports.createCategory = async (req, res, next) => {
  const { role, _id } = req.user;
  if (role !== "admin") {
    next(new PreConditionFailed("forbidden operation"));
  }

  const user = await User.findOne({ _id: _id });
  if (!user) {
    next(new BadRequest("user doesnt exit"));
  }

  const { category_name, category_chapters } = req.body;
  if (!category_name || !category_chapters)
    next(new BadRequest("missing datas"));

  const chapters = await Chapter.find({
    _id: { $in: category_chapters },
  });
  if (chapters.length !== category_chapters.length)
    next(new BadRequest("invalid chapter identified"));

  const chaptersIds = chapters.map((chapter) => chapter._id);

  const newCategory = new Category({
    category_name: category_name,
    category_chapters: chaptersIds,
  });

  try {
    const newCategorySaved = await newCategory.save();
    res.status(200).send(newCategorySaved);
  } catch (err) {
    next(err);
  }
};

module.exports.updateCategory = async (req, res, next) => {
  const { role, _id } = req.user;
  if (role !== "admin") {
    next(new PreConditionFailed("forbidden operation"));
  }

  const user = await User.findOne({ _id: _id });
  if (!user) {
    next(new BadRequest("user doesnt exit"));
  }

  const { category_name, category_chapters } = req.body;
  !category_name && !category_chapters && next(new BadRequest("missing datas"));

  const datas = {};
  if (category_chapters) {
    const chapters = await Chapter.find({
      _id: { $in: category_chapters },
    });
    if (chapters.length !== category_chapters.length)
      next(new BadRequest("invalid chapter identified"));
    datas.category_chapters = category_chapters;
  }
  if (category_name) {
    const { error, value } = await categoryNameValidator({
      category_name: category_name,
    });
    if (error) return next(new BadRequest(`${error.details[0].message}`));
    datas.category_name = category_name;
  }
  switch (action) {
    case RENAME_CATEGORY:
      break;
    case ADD_CHAPTER:
      break;
    case REMOVE_CHAPTER:
      break;

    default:
      break;
  }
  // remove chapter
  // add chapter
  // rename category
  try {
    const currentCategory = await Category.findOne({ _id: req.params.id });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCategory = async (req, res, next) => {
  const { role, _id } = req.user;
  if (role !== "admin") {
    next(new PreConditionFailed("forbidden operation"));
  }

  const user = await User.findOne({ _id: _id });
  if (!user) {
    next(new BadRequest("user doesnt exit"));
  }

  try {
    let deletedcategory = await Category.findOneAndDelete({
      _id: req.params.id,
    });
    !deletedcategory
      ? next(new NotFound("not existig category"))
      : res.status(200).send(`${req.params.id} category have been deleted`);
  } catch (err) {
    next(err);
  }
};
