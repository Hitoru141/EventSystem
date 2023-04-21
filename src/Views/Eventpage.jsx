import React from 'react'
import vct from '../assets/vct.jpg'
import { GoLocation, GoCalendar } from 'react-icons/go';
import { GrStatusGood} from 'react-icons/gr';
import { MdOpenWith } from 'react-icons/md';
import Navs from '../Components/Navs';

const Eventpage = () => {
  return (
    <div className='event-wrapper'>
    <div className='banner'>
      <h1 className='event-title-h1 '>
        VCT Sao Paulo
        </h1>
        <Navs currentPage='eventdetails' />
      </div>
    <div className='parent-wrap'>
      <div className="event-content">
        <div className='event-img-cont'><img src={vct}/></div>
        <div className='event-details'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem natus excepturi odit neque beatae amet laboriosam earum quia ex obcaecati aspernatur ab, inventore quos ea vel. Aperiam, iste nulla libero voluptatibus, minus, doloribus tempora eveniet commodi quas optio laudantium nostrum porro eaque incidunt culpa id nisi corrupti impedit inventore ullam illum! Aliquam molestias ullam, sunt, beatae accusantium reiciendis, culpa deleniti atque nostrum voluptatem ex. Eaque pariatur minus non vel? Voluptas, dolorum tempore! Consectetur voluptatem mollitia odio dolore, nam amet, libero repellat voluptas assumenda itaque labore ea, deserunt adipisci placeat obcaecati. Similique placeat quasi illum quo atque culpa aut consectetur magni.</div>
      </div>
        <div className="sub-content">
            <div className='event-deets'>
            <h2 className='h2-event-head'>Event Details </h2>
            <h3 className='h3-event-details'><GoCalendar/>Start Date</h3>
            <p>February 1, 2023</p><hr className='hr-event'/>
            <h3 className='h3-event-details'><GoCalendar/>End Date</h3>
            <p>February 28, 2023</p><hr className='hr-event'/>
            <h3 className='h3-event-details'><GoLocation/>Location</h3>
            <p>Sao Paulo, Brazil</p><hr className='hr-event'/>
            <h3 className='h3-event-details'><MdOpenWith/>Status</h3>
            <p>Finished event</p>
            </div>
          </div>
        </div>
    </div>
    
  );
}

export default Eventpage

 {/* https://images.pexels.com/photos/9072394/pexels-photo-9072394.jpeg?auto=compress&cs=tinysrgb&w=1600' */}