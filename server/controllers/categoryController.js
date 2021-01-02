const Category = require("../models/Category");
const Chapter = require("../models/Chapter");
const User = require("../models/User");

const {
  PreConditionFailed,
  Unauthorized,
  TokenIvalid,
  BadRequest,
  Forbidden,
} = require("../utils/errors");

module.exports.listCategories = (req, res, next) => {
  res.send("list categories");
};

module.exports.getCategory = (req, res, next) => {
  res.send("get category");
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

module.exports.updateCategory = (req, res, next) => {
  res.send("update category");
};

module.exports.deleteCategory = (req, res, next) => {
  res.send("delete category");
};
