import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { registerfunction, sentOtpFunction } from '../services/Apis';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/mix.css';

const Register = () => {
  const [passhow, setPassShow] = useState(false);

  const [inputdata, setInputdata] = useState({
    fname: '',
    email: '',
    password: '',
    otp: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };
  const sendOtp = async (e) => {
    e.preventDefault();

    const { email } = inputdata;

    if (email === '') {
      toast.error('Enter Your Email !');
    } else if (!email.includes('@')) {
      toast.error('Enter Valid Email !');
    } else {
      try {
        const data = {
          email: email
        }
        const response = await sentOtpFunction(data);
        if (response.status === 200 && response.data.message === 'Email sent Successfully') {
          toast.success('OTP sent successfully');
        } else if (response.status === 400) {
          toast.error('Email already registered');
        } else {
          toast.error('Otp not send');
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
        toast.error('Failed to send OTP');
      }
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, email, password } = inputdata;

    if (fname === '') {
      toast.error('Enter Your Name');
    } else if (email === '') {
      toast.error('Enter Your Email');
    } else if (!email.includes('@')) {
      toast.error('Enter Valid Email');
    } else if (password === '') {
      toast.error('Enter Your Password');
    } else if (password.length < 6) {
      toast.error('Password length minimum 6 characters');
    } else {
      try {
        const response = await registerfunction(inputdata);
        if (response && response.status === 200) {
          setInputdata({ ...inputdata, fname: '', email: '', password: '', otp: '' });
          navigate('/');
        } else {
          toast.error('Failed to register user');
        }
      } catch (error) {
        console.error('Error registering user:', error);
        toast.error('An error occurred while registering user');
      }
    }
  };






  return (
    <>
      <section>
        <div className="form_data register">
          <div className="form_heading">
            <h1>Join Port</h1>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="fname">Full Name <span className='text-danger'>*</span></label>
              <input type="text" name="fname" id="" onChange={handleChange} />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email <span className='text-danger'>*</span></label>
              <div className='two'>
                <input type="email" name="email" id="" onChange={handleChange} />
                <div className='showpass' onClick={sendOtp} >
                  {"verify"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="otp">OTP <span className='text-danger'>*</span></label>
              <input type="text" name="otp" id="" onChange={handleChange} />
            </div>
            <p className='mt-0'>We'll never share your email.</p>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className='two'>
                <input type={!passhow ? 'password' : 'text'} name="password" id="" onChange={handleChange} />
                <div className='showpass' onClick={() => setPassShow(!passhow)} >
                  {!passhow ? 'Show' : 'Hide'}
                </div>
              </div>
            </div>
            <button className='btn' onClick={handleSubmit}>Sign Up</button>
            <p>Already a member? <NavLink to="/">Sign in</NavLink> </p>
          </form>
        </div>
        <ToastContainer />
        <div className='imagesection'>
          <img src="img/login.jpg" alt="exportimportimage" />
        </div>
      </section>
    </>
  );
};

export default Register;
