import React from 'react';
import '../Styles/main.css';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom';

const Navs = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/')[1];

  return (
    <div className='nav-wrapper'>
      <Link to="/">
        <h4 className={currentPage === '' ? 'active' : ''}>Home</h4>
      </Link>
      <IoIosArrowDroprightCircle className={currentPage === 'events' ? 'active' : ''}/>
      <Link to="/events">
        <h4 className={currentPage === 'events' ? 'active' : ''}>Events</h4>
      </Link>

      {location.pathname === '/eventdetails' && currentPage === 'eventdetails' && (
        <>
          <IoIosArrowDroprightCircle className='active'/>
          <Link to="/eventdetails">
            <h4 className='active'>VCT Sao Paulo</h4>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navs;
