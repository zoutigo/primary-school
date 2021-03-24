const router = require("express").Router();
const {
  postEvent,
  getEvents,
  deleteEvent,
} = require("../controllers/eventController");
const { verifyToken } = require("../validators/tokens");

// Get event list
router.get("/:id?", getEvents);

// Create a event
router.post("/:id?", verifyToken, postEvent);

// Delete a event
router.delete("/:id", verifyToken, deleteEvent);

module.exports = router;
