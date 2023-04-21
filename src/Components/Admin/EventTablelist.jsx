import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/tablelist.css';
import '../../Styles/admin.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EventCards from '../EventCards';
import UpdateForm from './UpdateFormModal';

import { AiFillEye } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { HiPencilAlt } from 'react-icons/hi';


const EventTablelist = () => {
    const [preview, setPreview] = useState({ event: null, isOpen: false });
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4000/readEvents')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const handlePreview = (event) => {
        setPreview({
            event: {
                title: event.title,
                content: event.content,
                location: event.location,
                startDate: event.startDate,
                endDate: event.endDate,
                status: event.status,
                img: event.downloadURL
            },
            isOpen: true
        });
    }

    const handleClose = () => {
        setPreview({ event: null, isOpen: false });
    }

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



    const handleUpdateClick = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleCancelClick = () => {
        setIsModalOpen(false);
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

    return (
        <>
            <div className='position'>
                <input type="text" name="text" class="admin-input" placeholder="Search events" onChange={handleSearch} />
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Controls</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEvents.map((event, index) => (
                            <tr key={event.id}>
                                <td>{index + 1}</td>
                                <td>{event.title.length > 30 ? `${event.title.slice(0, 30)}...` : event.title}</td>
                                <td>
                                    {event.content.length > 50
                                        ? `${event.content.slice(0, 50)}...`
                                        : event.content}
                                </td>
                                <td>{event.location}</td>
                                <td>{event.startDate}</td>
                                <td>{event.endDate}</td>
                                <td>{event.status}</td>
                                <td>
                                    <button
                                        className="preview-button"
                                        onClick={() => handlePreview(event)}
                                    >
                                        <AiFillEye />
                                    </button>
                                    <button
                                        className="update-button"
                                        onClick={() => handleUpdateClick(event)}
                                    >
                                        <HiPencilAlt />
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteClick(event.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {preview.isOpen &&
                <div className="preview-modal">
                    <div className="preview-content">
                        <EventCards {...preview.event} />
                        <button className="close-button" onClick={handleClose}>Close</button>
                    </div>
                </div>
            }
            {isModalOpen && (
                <UpdateForm
                    event={selectedEvent}
                    toggleModal={() => setIsModalOpen(!isModalOpen)}
                    handleUpdateEvent={handleUpdateEvent}
                />
            )}
        </>
    );
};

export default EventTablelist;