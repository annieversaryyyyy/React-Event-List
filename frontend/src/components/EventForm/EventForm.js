import React, {useState} from 'react';
import PropTypes from 'prop-types';

// Components
import {Grid} from "@mui/material";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";

const EventForm = ({loading, error, eventData = {}, onSubmit}) => {
  const [calendarEvent, setCalendarEvent] = useState({
    title: eventData.title || '',
    datetime: eventData.datetime || '',
    duration: eventData.duration || '',
  });

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setCalendarEvent(prev => ({...prev, [name]: value}));
  };

  const submitFormHandler = e => {
    e.preventDefault();
    onSubmit(calendarEvent);
  };

  const getFieldError = fieldName => {
    try {
      return error[fieldName];
    } catch {
      return undefined;
    }
  };

  return (
    <Grid
      container
      spacing={2}
      component="form"
      onSubmit={submitFormHandler}
    >
      <FormElement
        required={true}
        label="Event Title"
        name="title"
        value={calendarEvent.title}
        onChange={inputChangeHandler}
        error={getFieldError('title')}
      />
      <FormElement
        required={true}
        type="datetime-local"
        name="datetime"
        value={calendarEvent.datetime}
        onChange={inputChangeHandler}
        error={getFieldError('datetime')}
      />
      <FormElement
        required={true}
        type="time"
        name="duration"
        value={calendarEvent.duration}
        onChange={inputChangeHandler}
        error={getFieldError('duration')}
      />
      <Grid item xs={12}>
        <ButtonWithProgress
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          loading={loading}
          disabled={loading}
        >
          Submit
        </ButtonWithProgress>
      </Grid>
    </Grid>
  );
};

EventForm.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  eventData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default EventForm;
