import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteRequest,fetchRequest} from '../../store/actions/eventsActions';
import './Dashboard.css';
import Spinner from "../../components/Spinner/Spinner";
import dayjs from "dayjs";

const Dashboard = () => {
    const dispatch = useDispatch();
    const events = useSelector(state => state.events.events);
    const user = useSelector(state => state.users.user);
    const  fetchLoading = useSelector(state => state.events.fetchLoading);


    useEffect(() => {
        dispatch(fetchRequest());
    }, [dispatch]);

    const deletePost = (eventId) => {
        dispatch(deleteRequest(eventId));
    };

    return (
        <main className='dashboard'>
           <div className='links'>
               <div>
                   <Link to="/new-event">New event</Link>
               </div>
               <div>
                   <Link to="/share-calendar">Share my calendar</Link>
               </div>
               <div>
                   <Link to="/collaborators">Collaborators</Link>
               </div>
           </div>

            {fetchLoading ? <Spinner/> : (
            <ul className='dashboardEvents'>
                {events.map(item => (
                    <li key={item._id} className='card'>
                    <div className='eventCard'>
                        <p>Title: {item.title}</p>
                        <p>Date: {dayjs(item.datetime).format('MMM D, YYYY h:mm A')}</p>
                        <p>Duration: {item.duration}h</p>
                       <div className='btn'>
                           {user._id === item.author._id ?
                               <>
                                   <button onClick={() => deletePost(item._id)}>Delete</button>
                                   <Link to={`/edit-event/${item._id}`}>Edit event</Link>
                               </>
                               : null}
                       </div>

                    </div>
                    </li>
                ))}
            </ul>
            )}

        </main>
    );
};

export default Dashboard;
