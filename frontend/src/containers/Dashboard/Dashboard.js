import React from 'react';
import {Link} from "react-router-dom";

const Dashboard = () => {
  return (
    <main className='dashboard'>
      <div>
        <Link to="/new-event">New event</Link>
      </div>
      <div>
        <Link to="/share-calendar">Share my calendar</Link>
      </div>
      <div>
        <Link to="/collaborators">Collaborators</Link>
      </div>
    </main>
  );
};

export default Dashboard;
