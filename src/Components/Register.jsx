import React, { useState } from 'react';
import '../Styles/Login.css';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';


export const Register = () => {
    const [formTransition, setFormTransition] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        const fullname = event.target.elements.fullname.value;
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;


        const response = await fetch('http://localhost:4000/createAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullname, username, password })
        });

        console.log(response.url);


        if (response.ok) {
            if (response.status === 200) {
                // wait for 1 second before redirecting to the admin dashboard
                setTimeout(() => {
                    window.location.href = '/signin';
                }, 1000);
            } else {
                // Registration failed
                console.error('Registration failed');
            }
        } else {
            // display an error message
            console.error('Registration failed');
        }


    };


    return (
        <main className="main">
            <Link to="/">
                <div className='back-wrap'><IoIosArrowBack className='back-btn' /><h3 className='home'>HOME</h3></div>
            </Link>
            <div className="container">
                <section className="wrapper">
                    <div className="heading">
                        <h1 className="text-large">Admin Sign Up</h1>
                    </div>
                    <form
                        name="signin"
                        className={`form ${formTransition ? 'form-transition' : ''}`}
                        onSubmit={onSubmit}
                    >
                        <div className="input-control">
                            <label htmlFor="fullname" className="input-label" hidden>
                                Fullname
                            </label>
                            <input
                                type="text"
                                name="fullname"
                                id="fullname"
                                className="input-field"
                                placeholder="Fullname"
                                required
                            />
                        </div>
                        <div className="input-control">
                            <label htmlFor="username" className="input-label" hidden>
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="input-field"
                                placeholder="Username"
                                required
                            />
                        </div>
                        <div className="input-control">
                            <label htmlFor="password" className="input-label" hidden>
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="input-field"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="btn-wrap">
                            <input
                                type="submit"
                                name="submit"
                                className="input-submit"
                                value="Sign Up"
                            />
                        </div>
                    </form>
                    <Link to="/signin"><p className='p-form'>Already have an account? Sign in.</p></Link>
                </section>
            </div>
        </main>
    );
};
