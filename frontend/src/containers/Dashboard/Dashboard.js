import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchRequest} from '../../store/actions/eventsActions';
import './Dashboard.css';
import {Card} from "@mui/material";


const Dashboard = () => {
    const dispatch = useDispatch();
    const events = useSelector(state => state.events.events);
    // const error = useSelector(state => state.events.fetchError);
    // const loading = useSelector(state => state.events.fetchLoading);

    useEffect(() => {
        dispatch(fetchRequest());
    }, [dispatch]);

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

            <ul className='dashboardEvents'>
                {events.map(item => (
                    <li key={item._id} className='card'>
                    <div className='eventCard'>
                        <p>Title: {item.title}</p>
                        <p>Date: {item.datetime}</p>
                        <p>Duration: {item.duration}h</p>
                    </div>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default Dashboard;
