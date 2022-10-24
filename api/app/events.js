const express = require('express');
const auth = require("../middleware/auth");
const CalendarEvent = require('../models/CalendarEvent');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const events = await CalendarEvent.find();

    if (!events) {
      res.status(404).send({message: 'Events not found!'});
    }
    res.send(events);
  } catch {
    res.sendStatus(500);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const {title, datetime, duration} = req.body;
    
    if (!title || !datetime || !duration) {
      return res.status(400).send({error: 'Data not valid'});
    }

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

router.put('/:id', auth, async (req, res) => {
  const {title, datetime, duration} = req.body;

  const calendarEvent = {
    author: req.user._id,
    title,
    datetime,
    duration
  };

  try {
    const event = await CalendarEvent.findById(req.params.id);

    if (!event) {
      res.status(404).send({message: 'Event not found!'});
    }

    const updateEvent = await CalendarEvent
        .findByIdAndUpdate(req.params.id, calendarEvent, {new: true});

    res.send(updateEvent);
  } catch {
    res.sendStatus(500);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await CalendarEvent.findById(req.params.id);

    if (!event) {
      res.status(404).send({message: 'Event not found!'});
    }

    const deleteEvent = await CalendarEvent
        .findByIdAndDelete({ _id: req.params.id });

    res.send(deleteEvent);
  } catch (e) {
    console.log(e)
    res.status(500).send(e);
  }
});


module.exports = router;