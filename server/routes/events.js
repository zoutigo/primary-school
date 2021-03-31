const router = require("express").Router();
const {
  postEvent,
  getEvents,
  deleteEvent,
} = require("../controllers/eventController");
const { verifyToken } = require("../validators/tokens");

// Get events
router.get("/:id?", getEvents);

// Post events
router.post("/:id?", verifyToken, postEvent);

// Delete a event
router.delete("/:id", verifyToken, deleteEvent);

module.exports = router;
