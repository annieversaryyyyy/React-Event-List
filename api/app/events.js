const express = require('express');
const auth = require("../middleware/auth");
const CalendarEvent = require('../models/CalendarEvent');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const artist = await CalendarEvent.find();
    res.send(artist);
  } catch {
    res.sendStatus(500);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const {title, datetime, duration} = req.body;
    
    if (!title || !datetime || !duration) return res.status(400).send({error: 'Data not valid'});

    const calendarEvent = new CalendarEvent({
      author: req.user._id,
      title,
      datetime,
      duration
    });

    await calendarEvent.save();
    res.send(calendarEvent);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;