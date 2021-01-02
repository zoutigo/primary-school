const Chapter = require("../models/Chapter");

module.exports.createChapter = async (req, res) => {
  const { chapter_name } = req.body;

  try {
    let chapter = new Chapter({
      chapter_name: chapter_name,
    });

    let newChapter = await chapter.save();

    res
      .status(200)
      .send(`new chapter ${chapter_name} created with id: ${newChapter._id}`);
  } catch (err) {
    res.status(400).send(`internal error: ${err}`);
  }
};
module.exports.listChapters = async (req, res) => {
  try {
    let chapters = await Chapter.find();

    chapters && chapters.length > 0
      ? res.status(200).send(chapters)
      : res.status(400).send("no chapter found");
  } catch (err) {
    res.status(400).send(`internal error: ${err}`);
  }
};
module.exports.getChapter = async (req, res) => {
  try {
    let chapter = await Chapter.findOne({ _id: req.params.id });
    chapter
      ? res.status(200).send(chapter)
      : res.status(400).send("this chapter does not exist");
  } catch (err) {
    res.status(400).send(`bad request: ${err}`);
  }
};
module.exports.updateChapter = async (req, res) => {
  console.log(req.params.id, req.body);
  try {
    const filter = { _id: req.params.id };
    let updatedChapter = await Chapter.findOneAndUpdate(filter, req.body, {
      returnOriginal: false,
    });
    updatedChapter
      ? res.status(200).send(`chapter updated: ${updatedChapter}`)
      : res.status(400).send("internal error");
  } catch (err) {
    res.send(`bad request : ${err}`);
  }
};
module.exports.deleteChapter = async (req, res) => {
  try {
    let deletedChapter = await Chapter.findOneAndDelete({ _id: req.params.id });
    !deletedChapter
      ? res.status(400).send("delete was not considered. Chapter not found")
      : res.status(200).send(`${req.params.id} have been deleted`);
  } catch (err) {
    res.status(400).send("internal error");
  }
};
