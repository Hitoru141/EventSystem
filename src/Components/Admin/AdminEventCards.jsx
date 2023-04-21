import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/admin.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GoLocation, GoCalendar } from 'react-icons/go';
import { MdOpenWith } from 'react-icons/md';
import UpdateForm from './UpdateFormModal';

const AdminEventCards = () => {
  const [events, setEvents] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const result = await axios.get('http://localhost:4000/readEvents');
      setEvents(result.data);
    };
    fetchEvents();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter((event) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      event.location.toLowerCase().includes(searchValue) ||
      event.status.toLowerCase().includes(searchValue) ||
      event.startDate.includes(searchValue) ||
      event.endDate.includes(searchValue) ||
      event.title.toLowerCase().includes(searchValue)
    );
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  }
  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      axios.post('http://localhost:4000/deleteEvents', { id })
        .then(response => {
          console.log(response.data.msg);
          setEvents(events.filter(event => event.id !== id));
          toast.success("Event deleted successfully!");
        })
        .catch(error => {
          toast.success("Failed to delete event!");
          console.log(error);
        });
    }
  }

  const handleUpdateClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }

  const handleUpdateEvent = (updatedEvent) => {
    axios.put('http://localhost:4000/updateEvent', updatedEvent)
      .then(response => {
        console.log(response.data.msg);
        setEvents(events.map(event => {
          if (event.id === updatedEvent.id) {
            return updatedEvent;
          }
          return event;
        }));
        toggleModal();
      })
      .catch(error => {
        console.log(error);
      });
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className='admin-cards-wrapper'>
      <input type="text" name="text" class="admin-input" placeholder="Search events" onChange={handleSearch} />
      {filteredEvents.map(event => (
        <div key={event.id} className='admin-maincard-wrapper' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className='sample-cards'>
            <img src={event.downloadURL} />
            {isHovered &&
              <div className='card-buttons'>
                <button className='delete-button' onClick={() => handleDeleteClick(event.id)}>Delete</button>
                <button className='update-button' onClick={() => handleUpdateClick(event)}>Update</button>
              </div>
            }
          </div>
          <div className='card-lower'>
            <h2 className='card-header'>{event.title}</h2>
            <p className='p-event-desc'>{event.content.length > 190 ? `${event.content.slice(0, 190)}...` : event.content}</p>
            <div className='sub-card-content'>
              <div className='sub-row-content'>
                <GoCalendar />
                <p className='p-event-desc'>Starts {new Date(event.startDate).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
                <GoCalendar />
                <p className='p-event-desc'>Ends {new Date(event.endDate).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
              </div>
              <div className='sub-row-content'>
                <GoLocation />
                <p className='p-event-desc'>{event.location}</p>
                <MdOpenWith />
                <p className='p-event-desc'>{event.status}</p>
              </div>
            </div>
          </div>
          {isModalOpen && (
            <UpdateForm
              event={selectedEvent}
              toggleModal={() => setIsModalOpen(!isModalOpen)}
              handleUpdateEvent={handleUpdateEvent}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminEventCards;
