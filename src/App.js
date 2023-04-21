import { Login } from './Components/Login';
import { Register } from './Components/Register';
import { useState, useEffect } from 'react';
import Splashscreen from './Views/Splashscreen';
import Events from './Views/Events';
import Eventpage from './Views/Eventpage';
import Home from './Views/Home';
import Admin from './Views/Admin';
import EventTablelist from './Components/Admin/EventTablelist';
import AdminProfile from './Components/Admin/AdminProfile';
import { Route, Routes } from "react-router-dom";
import Imagetest from './Views/Imagetest';



function App() {
  const [showSplashscreen, setShowSplashscreen] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSplashscreen(false);
    }, 2500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="app">
      {showSplashscreen && (
        <div><Splashscreen /></div>
      )}
      
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/test" element={<Imagetest/>}/>
      <Route path="/events" element={<Events/>}/>
      <Route path="/eventdetails" element={<Eventpage/>}/>
      <Route path="/signin" element={<Login/>}/>
      <Route path="/signup" element={<Register/>}/>
      <Route path="/Admin" element={<Admin/>}/>
      <Route path="/Settings" element={<AdminProfile/>}/>
      <Route path="/Table-list" element={<EventTablelist/>}/>
    </Routes>
    </div>
  );
}

export default App;
