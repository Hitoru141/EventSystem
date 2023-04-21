import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Home.css';
import { Link } from 'react-router-dom';
import { GoLocation } from 'react-icons/go';
import { FaRegCalendarAlt, FaFacebook, FaGitlab, FaLinkedin, FaTiktok } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import appLogo from '../assets/app_logo.png';
import Explorebtn from '../Components/Explorebtn';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:4000/readEvents')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % events.length;
        setCurrentIndex(nextIndex);
        setFadeOut(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, events]);

  const handleClick = (image, title) => {
    setFadeOut(true);
    setTimeout(() => {
      setFadeOut(false);
    }, 1000);
  };

  return (
    <div className='home-container' style={{ backgroundImage: `url(${events[currentIndex]?.downloadURL})` }}>
      <header className='home-header'>
        <Link to="/"><img src={appLogo} className='eventr-logo' /></Link>
        <div>
          <a href="https://www.facebook.com/dnamicrosoftwareinc" > <FaFacebook className='header-icons' id="fb-icon" /> </a>
          <a href="http://gitlab.dnamicro.net/jhonlloydquizeo/event-system-intern-app-admin/-/tree/development" > <FaGitlab className='header-icons' id="gitlab-icon" /> </a>
          <a href="https://ph.linkedin.com/company/dnamicrosoftwareinc" > <FaLinkedin className='header-icons' id="linkedin-icon" /> </a>
          <a href="https://www.tiktok.com/@dnamicro" > <FaTiktok className='header-icons' id="tiktok-icon" /> </a>
          <Link to="/signin"><button className='login-btn'>Sign In</button></Link>
        </div>
      </header>
      <main className={`home-content${fadeOut ? ' fade-out' : ''}`}>
        <h1 className={`title${fadeOut ? ' fade-out' : ''}`}>{events[currentIndex]?.title}</h1>
        <div className={`home-controls${fadeOut ? ' fade-out' : ''}`}>
          <FaRegCalendarAlt className="controls" color='#ffcc00' />
          <div className='controls'>Starts {new Date(events[currentIndex]?.startDate).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</div>
          <FaRegCalendarAlt className="controls" color='#ffcc00' /> 
          <div className='controls'>Ends {new Date(events[currentIndex]?.endDate).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</div>
          <GoLocation className="controls" color='#ffcc00' />
          <div className='controls'>{events[currentIndex]?.location}</div>
        </div>
        <br />
      </main>
      <Link to="/events"><Explorebtn/></Link>
      <button className='download-google-play'><a href='https://play.google.com/store/games?hl=en&gl=US' target='_blank'>
          <FcGoogle />&nbsp;&nbsp;
          Download in Google Play Store
        </a></button>
    </div>
  )
}

export default Home;