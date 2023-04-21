import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import {v4} from 'uuid'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../imagedb/firebase';


const UpdateForm = ({ event, isOpen, toggleModal, onUpdateSuccess }) => {

  const [title, setTitle] = useState(event.title);
  const [content, setContent] = useState(event.content);
  const [location, setLocation] = useState(event.location);
  const [startDate, setStartDate] = useState(event.startDate);
  const [endDate, setEndDate] = useState(event.endDate);
  const [status, setStatus] = useState(event.status);
  const [isUpdated, setIsUpdated] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEvent = {
      id: event.id,
      title,
      content,
      location,
      startDate,
      endDate,
      status,
    };
  
    if (window.confirm("Are you sure all details are already correct?")) {
      // Upload file to Firebase storage
      const file = e.target.elements.file.files[0];
      if (file) {
        const storageRef = ref(storage, `images/${file.name + v4()}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        updatedEvent.downloadURL = downloadURL;
      }
  
      // Update event details and download URL in Firebase database
      toggleModal(false);
      const response = await axios.post('http://localhost:4000/updateEvents', updatedEvent);
      if (response.status === 200) {
        toast.success("Event updated successfully!");
        console.log(response.data.msg);
        onUpdateSuccess(updatedEvent);
      } else {
        toast.error("Failed to update event!");
        console.log("Error");
      }
    }
  }

  const handleCloseModal = () => {
    toggleModal(false);
  };

  return (
    <div className='event-form-modal'>
      <div className={`update-modal ${isOpen ? 'open' : ''}`}>
        <div className="update-content">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} maxlength='25' />

            <label htmlFor="content">Description:</label>
            <textarea id="content" value={content} onChange={e => setContent(e.target.value)} />

            <label htmlFor="location">Location:</label>
            <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} />

            <label htmlFor="startDate">Start Date:</label>
            <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} />

            <label htmlFor="endDate">End Date:</label>
            <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} />

            <label htmlFor='file'>Upload image</label>
            <input type='file' id='file' name='file' />

            <label htmlFor="status">Status:</label>
            <select id="status" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="Upcoming Event">Upcoming Event</option>
              <option value="Ongoing Event">Ongoing Event</option>
              <option value="Finished Event">Finished Event</option>
            </select>

            <div className='btn-wrap'>
              <button type='submit'>Update</button>
              <button type='button' onClick={handleCloseModal}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
