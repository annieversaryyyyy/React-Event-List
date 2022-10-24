const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalendarEventSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  title: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  }
});

const CalendarEvent = mongoose.model('CalendarEvent', CalendarEventSchema);

module.exports = CalendarEvent;