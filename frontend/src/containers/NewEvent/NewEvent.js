import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

// Components
import {Container, Grid, Typography} from "@mui/material";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";

// Store
import {createRequest} from "../../store/actions/eventsActions";

const NewEvent = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.events.createError);
  const loading = useSelector(state => state.events.createLoading);

  const [calendarEvent, setCalendarEvent] = useState({
    title: '',
    datetime: '',
    duration: '',
  });

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setCalendarEvent(prev => ({...prev, [name]: value}));
  };

  const submitFormHandler = e => {
    e.preventDefault();

    dispatch(createRequest({...calendarEvent}));
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <main className='new-event'>
      <Container maxWidth="xs">
        <Typography component="h1" variant="h6">
          Create the new event
        </Typography>

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
              Create the new event
            </ButtonWithProgress>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default NewEvent;
