import React from 'react'
import '../Styles/event.css'
import { GoLocation, GoCalendar } from 'react-icons/go';
import { MdOpenWith } from 'react-icons/md';
import { Link } from 'react-router-dom';
const EventCards = ({ title, content, startDate, endDate, img, location, status }) => {
  return (
    <Link to="/eventdetails">
      <div className='maincard-wrapper'>
        <div className='sample-cards'><img src={img} alt='Esports' /></div>
        <div className='card-lower'>
          <h2 className='card-header'>{title}</h2>
          <p className='p-event-desc'>{content.length > 190 ? `${content.slice(0, 190)}...` : content}</p>
          <div className='sub-card-content'>
            <div className='sub-row-content'>
              <GoCalendar />
              <p className='p-event-desc'>Starts {new Date(startDate).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
              <GoCalendar />
              <p className='p-event-desc'>Ends {new Date(endDate).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
            </div>
            <div className='sub-row-content'>
              <GoLocation />
              <p className='p-event-desc'>{location}</p>
              <MdOpenWith />
              <p className='p-event-desc'>{status}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default EventCards