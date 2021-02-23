const Page = require("../models/Page");
const User = require("../models/User");
const {
  BadRequest,
  Forbidden,
  NotFound,
  Unauthorized,
} = require("../utils/errors");
const { pageValidator } = require("../validators/pages");

module.exports.createPage = async (req, res, next) => {
  const { grade, _id: userId } = req.user;
  const grades = ["admin"];
  if (!grades.includes(grade) && process.NODE_ENV === "production") {
    return next(new Unauthorized("unautorized operation"));
  }

  const { text, alias, title } = req.body;
  if (!text || !alias || !title)
    return next(new BadRequest("missing text or alias or title"));

  if (alias) {
    let { error } = await pageValidator({ alias: alias });
    if (error) return next(new BadRequest(`${error.details[0].message}`));
  }
  if (text) {
    let { error } = await pageValidator({ text: text });
    if (error) return next(new BadRequest(`${error.details[0].message}`));
  }
  if (title) {
    let { error } = await pageValidator({ title: title });
    if (error) return next(new BadRequest(`${error.details[0].message}`));
  }

  try {
    const newPage = new Page({
      text: text,
      alias: alias,
      title: title,
    });

    const createdPage = await newPage.save();
    if (!createdPage) return next();

    res.status(201).send(createdPage);
  } catch (err) {
    if (err.code === 11000)
      return next(new BadRequest("Dupliclate not allowed on alias"));
    // return next(err);
    return next(err);
  }
};
module.exports.updatePage = async (req, res, next) => {
  const { grade, _id } = req.user;
  const { id } = req.params;
  const datas = {};
  const newPage = {};

  // check user grade
  const grades = ["admin", "manager", "moderator"];
  if (!grades.includes(grade) && process.NODE_ENV === "production")
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
    // check if page id is correct format
    const { error } = await pageValidator({ id: id });
    if (error) return next(new BadRequest(`${error.details[0].message}`));
    // check if page exists
    try {
      const page = await Page.findOne({ _id: id });
      if (!page) return next(new NotFound("Page does not exists"));
      datas.page = page;
    } catch (err) {
      return next(new BadRequest(err));
    }
  }
  // check if req.body is empty
  if (Object.keys(req.body).length === 0) {
    return next(new BadRequest("missing datas "));
  }

  // fieds validation
  const { text } = req.body;

  // text validation
  if (text) {
    if (text !== datas.page.text) {
      const { error } = await pageValidator({ text: text });
      if (error) {
        return next(new BadRequest(`${error.details[0].message}`));
      }
    }
    newPage.text = text;
  }

  // insertion in database
  try {
    let savedpage = await Page.findOneAndUpdate({ _id: id }, newPage, {
      returnOriginal: false,
    });
    if (!savedpage) return next();
    return res.status(200).send(savedpage);
  } catch (err) {
    return next(err);
  }
};
module.exports.listPages = async (req, res, next) => {
  try {
    let pages = await Page.find();
    if (!pages) return res.status(204);
    return res.status(200).send(pages);
  } catch (err) {
    return next(err);
  }
};
module.exports.deletePage = async (req, res, next) => {
  const { grade, _id } = req.user;
  const { id } = req.params;

  // check user grade
  const grades = ["admin", "manager"];
  if (!grades.includes(grade) && process.NODE_ENV === "production")
    return next(new Forbidden("forbidden operation"));

  // check if user exists
  try {
    let user = await User.findOne({ _id: _id });
    if (!user) {
      return next(new Forbidden("user does not exist"));
    }
  } catch (err) {
    return next(err);
  }
  // delete in database
  try {
    let deletedPage = await Page.findOneAndDelete({ _id: req.params.id });

    if (!deletedPage) return next(new NotFound("not existing page"));
    return res.status(200).send(`${req.params.id} page have been deleted`);
  } catch (err) {
    return next(err);
  }
};
