const router = require("express").Router();
const Event = require("../Models/Event");

router.post("/create-event", async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.sendStatus(201);
});

router.get("/get-events", async (req, res) => {
  const events = await Event.find();
  res.send(events);
});

module.exports = router;

