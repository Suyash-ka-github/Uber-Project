import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';

function UserSignup() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
   
  const {user, setUser} = useContext(UserDataContext);

  const submitForm = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: { firstname, lastname },
      email,
      password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    if (response.status === 201) {
       const data= response.data
      localStorage.setItem('token',data.token);
      setUser(data.user)
      navigate('/home');
    } else {
      console.error('Signup failed:', response.data);
    }
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber-Logo"
        className="absolute w-20 ml-5 mt-6"
      />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-8 flex flex-col items-center w-80 mb-10">
          <form className="flex flex-col w-full" onSubmit={submitForm}>
            <label className="text-gray-800 text-xl font-semibold mb-2 w-full text-left">
              What's your name
            </label>
            <div className="flex gap-2 mb-4">
              <input
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-1/2"
                type="text"
                placeholder="First name"
              />
              <input
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-1/2"
                type="text"
                placeholder="Last name"
              />
            </div>
            <label className="text-gray-800 text-xl font-semibold mb-2 w-full text-left">
              What's your email
            </label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
              type="email"
              placeholder="email@example.com"
            />
            <label className="text-xl font-semibold mb-2 w-full text-left" htmlFor="password">
              Enter Password
            </label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="password"
              className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
            />
            <button className="bg-black text-white text-xl px-4 py-2 rounded-lg w-full mb-3">
              Signup
            </button>
          </form>
          <div className="mb-4 w-full text-center">
            <span className="text-gray-600 text-sm">
              Already have a account?{' '}
              <Link to="/user-login" className="text-blue-600 hover:underline">
                LogIn here
              </Link>
            </span>
          </div>
        </div>
        <div className="div p-2 text-center">
            <p className="text-xs text-gray-500 mt-2">
            By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
          </p>
        </div>
        
      </div>
    </>
  );
}

export default UserSignup;
