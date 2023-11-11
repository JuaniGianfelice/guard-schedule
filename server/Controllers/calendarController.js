const router = require("express").Router();
const Event = require("../Models/Event");
//const moment = require("moment");

router.post("/create-event", async (req, res) => {
  const event = Event(req.body);
  await event.save();
  res.sendStatus(201);
});

//Controlar start y end por que no los puse en Event.js ya que vamos a obtener una fecha fija 
router.get("/get-events", async (req, res) => {
  const events = await Event.find({
    /*Si llegamos a usar 2 parametros de fechas necesitamos "Moment"
    start: { $gte: moment(req.query.start).toDate() },
    end: { $lte: moment(req.query.end).toDate() },*/
    date: selectedDate
  });

  res.send(events);
});

module.exports = router;
