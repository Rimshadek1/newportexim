// Login.js
import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { userVerify } from "../services/Apis";
import Spinner from 'react-bootstrap/Spinner';
import "../styles/mixlogin.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();
    const [passhow, setPassShow] = useState(false);

    const login = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("Enter Your Email !");
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !");
        } else {
            setSpinner(true);
            const data = {
                email: email,
                password: password
            };

            try {
                const response = await userVerify(data);
                localStorage.setItem('jwtToken', response.data.token);
                localStorage.setItem('userRole', response.data.role);
                setSpinner(false);
                if (response.data.role === 'admin') {
                    navigate("/admindash");
                } else {
                    navigate("/home");
                }
            } catch (error) {
                console.error('Error during login:', error);
                toast.error("Login failed. Please try again.");
                setSpinner(false);
            }
        }
    };


        return (
            <>
                <section className='login'>
                    <img src="img/log.jpg" className='back' alt="loginbackground" />
                    <div className="login1 " style={{ height: '75%' }}>
                        <div className="heading">
                            <img src="img/portexim.png" style={{ height: '100%' }} alt="portexim logo" />
                        </div>
                        <form className='login3' style={{ marginTop: '1px' }}>
                            <div className="form_input">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="" onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Address' />
                            </div>
                            <div className="form_input">
                                <label htmlFor="password">Password</label>
                                <div className='two'>
                                    <input type={!passhow ? 'password' : 'text'} name="password" id="" onChange={(e) => setPassword(e.target.value)} />
                                    <div className='showpass' onClick={() => setPassShow(!passhow)} >
                                        {!passhow ? 'Show' : 'Hide'}
                                    </div>
                                </div>
                            </div>
                            <button className='btn' onClick={login}>Login
                                {spinner && <span><Spinner animation="border" /></span>}
                            </button>
                            <p>Don't have an account <NavLink to="/register">Sign up</NavLink> </p>
                        </form>
                    </div>
                    <ToastContainer />
                </section >
            </>
        );
    };

    export default Login;
