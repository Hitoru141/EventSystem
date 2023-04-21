import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'
import '../../Styles/admin.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal = () => {
    const [admins, setAdmins] = useState([]);
    const [adminUsername, setAdminUsername] = useState('');
    const [adminFullname, setAdminFullname] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:4000/readAdmin')
            .then((response) => {
                setAdmins(response.data);
                const storedAdminUsername = localStorage.getItem('adminUsername');
                if (storedAdminUsername) {
                    setAdminUsername(storedAdminUsername);
                }
                const currentAdmin = response.data.find((admin) => admin.username === storedAdminUsername);
                setAdmin(currentAdmin);
                setAdminFullname(currentAdmin.fullname); // set initial value of adminFullname
                setAdminPassword(currentAdmin.password); // set initial value of adminFullname
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const handleUpdate = (event) => {
        event.preventDefault();
        if (window.confirm("Are you sure you want to update this admin account?")) {
          axios
            .post("http://localhost:4000/updateAdmin", {
              id: admin.id,
              fullname: adminFullname,
              password: adminPassword,
            })
            .then((response) => {
              toast.success("Admin account updated!");
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
              // Optionally, show an error message to the user
            });
        }
      };
      


    return (
        <>
            <div className="admin-profile">
                <div className="adminmodal-content">
                    <div className="row">
                        <div className="col-md-6">
                            <img className='round-image' src='https://visualpharm.com/assets/314/Admin-595b40b65ba036ed117d36fe.svg' />
                            <h1>ADMINISTRATOR</h1>
                            {admin && (
                                <form onSubmit={handleUpdate}>
                                    <label htmlFor="fullname">Fullname</label>
                                    <input
                                        type="text"
                                        id="fullname"
                                        name="fullname"
                                        className='input-adminform'
                                        value={adminFullname}
                                        onChange={(event) => setAdminFullname(event.target.value)}
                                    />

                                    <label htmlFor="username"><AiOutlineUser /> Username:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className='input-adminform'
                                        value={admin.username}
                                        readOnly
                                    />

                                    <label htmlFor="password"><AiOutlineLock /> Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className='input-adminform'
                                        value={adminPassword}
                                        onChange={(event) => setAdminPassword(event.target.value)}
                                    />
                                    <div className='admin-btn'>
                                        <button className='submit-btn' type='submit'>Update</button>
                                        <Link to='/Admin'>
                                            <button className='cancel-btn' type='Cancel'>Cancel</button>
                                        </Link>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
};

export default Modal;
