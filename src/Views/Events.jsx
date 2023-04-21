import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EventCards from '../Components/EventCards';
import vct from '../assets/vct.jpg';
import Navs from '../Components/Navs';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/readEvents')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className='first-content'>
      <div className='header-container'>
        <h1 className='esports-h1'>ESPORTS EVENT</h1>
        <Navs />
      </div>
      <div className='eventwrapper'>
     
        {events.map(event => (
          <EventCards
            title={event.title}
            content={event.content}
            location={event.location}
            startDate={event.startDate}
            endDate={event.endDate}
            status={event.status}
            img={event.downloadURL}
          />
        ))}
      </div>
    </div>
  );
};

export default Events;