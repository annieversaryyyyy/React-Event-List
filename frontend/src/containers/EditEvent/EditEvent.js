import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";
import EventForm from "../../components/EventForm/EventForm"
import {
    fetchEventRequest,
  updateEventRequest
} from "../../store/actions/eventsActions";
import {Container, Typography} from "@mui/material";
import Spinner from "../../components/Spinner/Spinner";


const EditEvent = ({match, history}) => {
    const dispatch = useDispatch();
    const eventData = useSelector(state => state.events.event);
    const fetchEventError = useSelector(state => state.events.fetchEventError);
    const fetchEventLoading = useSelector(state => state.events.fetchEventLoading);
    const editEventError = useSelector(state => state.events.editEventError);
    const editEventLoading = useSelector(state => state.events.editEventLoading);

    useEffect(() => {
        dispatch(fetchEventRequest(match.params.id));
    }, [dispatch, match.params.id]);

    const updateEvent = eventData => {
        dispatch(updateEventRequest({_id: match.params.id, ...eventData}));
    }

    if (fetchEventError) history.push('/');

    return (
        fetchEventLoading ? <Spinner>Loading...</Spinner>
            :
            <main className='edit-event'>
                <Container maxWidth="xs">
                    <Typography component="h1" variant="h6">
                        Edit "{eventData.title}" event
                    </Typography>

                    <EventForm
                        error={editEventError}
                        loading={editEventLoading}
                        eventData={eventData}
                        onSubmit={updateEvent}
                    />
                </Container>
            </main>
    );
};

export default EditEvent;