const express = require('express');
const auth = require("../middleware/auth");
const CalendarEvent = require('../models/CalendarEvent');
const dayjs = require("dayjs");

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    let events = [];
    const collaborators = req.user.collaborators;

    const userEvents = await CalendarEvent.find({
      author: req.user._id
    }).populate("author").sort({datetime: 1});
    events = [...events, ...userEvents];

    if (collaborators && collaborators.length) {
      for (const collaboratorId of collaborators) {
        const collaboratorEvents = await CalendarEvent.find({
          author: collaboratorId
        }).sort({datetime: 1});
        events = [...events, ...collaboratorEvents];
      }
    }

    if (!events) res.status(404).send({message: 'Events not found!'});

    res.send(events);
  } catch(e) {
    console.error(e);
    res.sendStatus(500).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const calendarEvent = await CalendarEvent.findById(req.params.id);

    if (!calendarEvent) {
      res.status(404).send({message: 'Event not found!'});
    }

    res.send(calendarEvent);
  } catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const {title, datetime, duration} = req.body;

    if (!title || !datetime || !duration) {
      return res.status(400).send({
        message: 'Data not valid'
      });
    }

    const dateDiff = dayjs(datetime).diff(new Date(), 'day');

    if (dateDiff < 0) {
      return res.status(400).send({
        datetime: 'Datetime should not be older than current date'
      });
    }

    const calendarEvent = new CalendarEvent({
      title,
      duration,
      author: req.user._id,
      datetime
    });

    await calendarEvent.save();
    res.send(calendarEvent);
  } catch(e) {
    console.error(e);
    res.status(400).send(e);
  }
});

router.put('/update/:id', auth, async (req, res) => {
  const {title, datetime, duration} = req.body;


  if (!title || !datetime || !duration) {
    return res.status(400).send({error: 'Data not valid'});
  }

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

router.delete('/delete/:id', auth, async (req, res) => {
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