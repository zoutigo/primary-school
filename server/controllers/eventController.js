const Event = require("../models/Event");
const { BadRequest, NotFound } = require("../utils/errors");
const { fieldsforvalidator } = require("../utils/fieldtoarray");
const { eventValidator } = require("../validators/events");

module.exports.postEvent = async (req, res, next) => {
  const { grade, roles, _id: userId } = req.user;
  const { id: eventId, action } = req.query;
  const grades = ["manager", "admin", "moderator"];

  if (Object.keys(req.body).length < 1) {
    return next(new BadRequest("datas missing"));
  }

  // check grade and role
  const isGradAllowed = grades.includes(grade);

  const fields = fieldsforvalidator(req.body);
  const errors = eventValidator(fields);
  if (errors.length > 0) {
    return next(new BadRequest(errors));
  }

  if ((action = "create")) {
    // case event creation
    const event = req.body;
    event.author = userId;
    let newEvent = new Event(event);
    try {
      let savedEvent = await newEvent.save();
      if (savedEvent) {
        if (process.env.NODE_ENV === "production") {
          return res.status(201).send("event successfully created");
        }
        return res.status(201).send(savedEvent);
      }
    } catch (err) {
      return next(err);
    }
  } else if ((action = "update" & eventId)) {
    // case update

    try {
      let updatedEvent = Event.findOneAndUpdate({ _id: eventId }, req.body, {
        returnOriginal: false,
      });
      if (updatedEvent) {
        if (process.env.NODE_ENV === "production") {
          return res.status(200).send("event successfully updated");
        }
        return res.status(200).send("event successfully updated");
      }
    } catch (err) {
      return next(err);
    }
  } else if ((action = "delete" & eventId)) {
    try {
      let deletedEvent = await Event.findOneAndDelete({ _id: eventId });
      if (deletedEvent) {
        return res.status(200).send("event deleted successfully");
      }
    } catch (err) {
      return next(err);
    }
  } else {
    return next(new BadRequest("params missing"));
  }
};

module.exports.getEvents = async (req, res, next) => {
  const fields = fieldsforvalidator(req.query);
  const errors = eventValidator(fields);

  if (errors.length > 0) {
    return next(new BadRequest(errors));
  }

  try {
    if (req.query.id) {
      req.query._id = req.query.id;
      delete req.query.id;
    }
    const events = await Event.find(req.query);
    events.length > 0
      ? res.status(200).send(events)
      : next(new NotFound("event not found"));
  } catch (err) {
    next(err);
  }
};

module.exports.deleteEvent = async (req, res) => {
  res.send("delete event not implmented");
};
