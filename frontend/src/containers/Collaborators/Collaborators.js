import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Container, Typography} from "@mui/material";

import {
  fetchCollaboratorsRequest,
  removeCollaboratorRequest,
} from '../../store/actions/usersActions';
import Spinner from "../../components/Spinner/Spinner";

const Collaborators = () => {
  const dispatch = useDispatch();
  const collaborators = useSelector(state => state.users.collaborators);
  const fetchCollaboratorsError = useSelector(state => state.users.fetchCollaboratorsError);
  const fetchCollaboratorsLoading = useSelector(state => state.users.fetchCollaboratorsLoading);

  useEffect(() => {
    dispatch(fetchCollaboratorsRequest());
  }, [dispatch]);

  const removeCollaborator = collaboratorId => {
    dispatch(removeCollaboratorRequest(collaboratorId));
  };


  return (
      <main className="collaborators-list">
        <Container maxWidth="xs">
          <Typography component="h1" variant="h6">
            Who can view my calendar:
          </Typography>

          {fetchCollaboratorsLoading ? <Spinner/> : (
              <ul>
                {collaborators && collaborators.map(item => (
                    <li key={item._id}>
                      <p>Email: {item.email}</p>
                      <button onClick={() => removeCollaborator(item._id)}>Remove collaborator</button>
                    </li>
                ))}
              </ul>
          )}
        </Container>
      </main>
  );
};

export default Collaborators;
