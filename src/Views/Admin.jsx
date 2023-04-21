import React, { useState, useEffect } from 'react';
import '../Styles/admin.css';
import axios from 'axios';

import AdminSideBar from '../Components/Admin/AdminSideBar';
import AdminEventCards from '../Components/Admin/AdminEventCards';
import EventFormModal from '../Components//Admin/EventFormModal';
import EventTablelist from '../Components/Admin/EventTablelist';

import { LayoutGrid, List } from 'tabler-icons-react';


const Admin = () => {
  const [view, setView] = useState('grid');

  const handleViewChange = (viewType) => {
    setView(viewType);
  };

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
    <div className='admin-wrapper'>
      <AdminSideBar />
      <div className='admin-eventbtn-wrap'>
        <div className='addbtn-wrap'>
          <EventFormModal />
        </div>
        <button
          className={`view-button1 ${view === 'grid' ? 'active' : ''}`}
          onClick={() => handleViewChange('grid')}>
          <LayoutGrid
            size={40}
            strokeWidth={2}
            color={'white'}
          />
        </button>

        <button
          className={`view-button2 ${view === 'list' ? 'active' : ''}`}
          onClick={() => handleViewChange('list')}
        >
          <List
            size={40}
            strokeWidth={2}
            color={'white'}
          />
        </button>

      </div>
      {view === 'grid' ? (
        <AdminEventCards />
      ) : (
        <div className='admin-tablelist-wrapper'>
          <EventTablelist />

        </div>
      )}

    </div>
  );
};

export default Admin;