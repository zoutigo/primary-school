const Category = require("../models/Category");
const Rubric = require("../models/Rubric");
const { PreConditionFailed, BadRequest } = require("../utils/errors");
const {
  rubricNameValidator,
  rubricCategoriesValidator,
} = require("../validators/rubrics");

module.exports.listRubrics = async (req, res, next) => {
  try {
    let rubrics = await Rubric.find();
    rubrics && rubrics.length > 0
      ? res.status(200).send(rubrics)
      : next(new NotFound(`No rubric existing`));
  } catch (err) {
    next(err);
  }
};
module.exports.getRubric = async (req, res, next) => {
  try {
    let rubric = await Rubric.find({ _id: req.params.id });
    rubric
      ? res.status(200).send(rubric)
      : next(new NotFound("Not existing rubric"));
  } catch (err) {
    next(err);
  }
};
module.exports.createRubric = async (req, res, next) => {
  const { role, _id } = req.user;
  if (role !== "admin") {
    next(new PreConditionFailed("forbidden operation"));
  }

  const { rubric_name } = req.body;
  !rubric_name && next(new BadRequest("missing datas"));

  const { error, value } = rubricNameValidator(req.body);
  error && next(new BadRequest(`${error.details[0].message}`));

  try {
    const newRubric = new Rubric({ rubric_name: rubric_name });
    const newRubricSaved = await newRubric.save();
    res.status(200).send(newRubricSaved);
  } catch (err) {
    next(err);
  }
};
module.exports.updateRubric = async (req, res, next) => {
  const { role, _id } = req.user;
  const { rubric_name, rubric_categories } = req.body;

  role !== "admin" && next(new PreConditionFailed("forbidden operation"));

  !rubric_name && !rubric_categories && next(new BadRequest("missing datas"));

  try {
    const previousRubric = await Rubric.findOne({ _id: req.params.id });
    !previousRubric && next(new BadRequest("rubric does not exist"));

    const newRubric = {};

    if (rubric_name && previousRubric.rubric_name !== rubric_name) {
      let { error } = rubricNameValidator(req.body);
      error && next(new BadRequest(`${error.details[0].message}`));
      newRubric.rubric_name = rubric_name;
    }

    const areNewCategories =
      JSON.stringify(previousRubric.rubric_categories) !==
      JSON.stringify(rubric_categories);

    if (rubric_categories && areNewCategories) {
      let { error } = rubricCategoriesValidator({
        rubric_categories: rubric_categories,
      });
      error && next(new BadRequest(`${error.details[0].message}`));

      newRubric.rubric_categories = await Promise.all(
        rubric_categories.map(async (category) => {
          console.log("result");
          let { _id } = await Category.findOne({ _id: category });
          if (_id) {
            return _id;
          } else {
            return null;
          }
        })
      );
    }

    if (areNewCategories && newRubric.rubric_categories.includes(null)) {
      next(new BadRequest("category does not exist"));
    } else {
      try {
        const savedNewRubric = await Rubric.findByIdAndUpdate(
          { _id: req.params.id },
          newRubric,
          { returnOriginal: false }
        );
        res.status(200).send(savedNewRubric);
      } catch (err) {
        next(err);
      }
    }
  } catch (err) {
    next(err);
  }
};
module.exports.deleteRubric = async (req, res, next) => {
  const { role, _id } = req.user;
  role !== "admin" && next(new PreConditionFailed("forbidden operation"));

  try {
    let deletedRubric = await Rubric.findOneAndDelete({ _id: req.params.id });
    !deletedRubric
      ? next(new NotFound("not existing rubric"))
      : res.status(200).send(`${req.params.id} rubric have been deleted`);
  } catch (err) {
    next(err);
  }
};
