import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

// Components
import {Container, Grid, Typography} from "@mui/material";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";

// Store
import {addCollaboratorRequest} from "../../store/actions/usersActions";

const ShareCalendar = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.users.addCollaboratorError);
  const loading = useSelector(state => state.users.addCollaboratorLoading);

  const [userEmail, setUserEmail] = useState('');

  const inputChangeHandler = e => {
    setUserEmail(e.target.value);
  };

  const submitFormHandler = e => {
    e.preventDefault();
    dispatch(addCollaboratorRequest(userEmail));
  };

  const getFieldError = fieldName => {
    try {
      return error[fieldName];
    } catch {
      return undefined;
    }
  };

  return (
      <main className='share-calendar'>
        <Container maxWidth="xs">
          <Typography component="h1" variant="h6">
            Share my calendar
          </Typography>
          <Grid
              container
              spacing={2}
              component="form"
              onSubmit={submitFormHandler}
          >
            <FormElement
                required={true}
                label="Email"
                name="email"
                value={userEmail}
                onChange={inputChangeHandler}
                error={getFieldError('email')}
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
                Share my calendar
              </ButtonWithProgress>
            </Grid>
          </Grid>
        </Container>
      </main>
  );
};

export default ShareCalendar;