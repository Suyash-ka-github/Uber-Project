import React from 'react'
import { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';


function Captainlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {captain,setCaptain} = useContext(CaptainDataContext);
  const navigate = useNavigate();
   
  const submitForm = async(e) => {
    e.preventDefault();
    const captainData = {
      email,
      password,
    };
    const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);
    if (response.status === 200) {  
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token',data.token);
      navigate('/captain-home');
    } else {
      console.error('Login failed:', response.data);
    }
    
    
    setEmail('');
    setPassword('');
  };


  return (
    <>
     <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png
" alt="Uber-Logo" className='absolute w-20 ml-5 mt-6' />
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white p-8  flex flex-col items-center w-80 mb-44">
        <form className="flex flex-col w-full" onSubmit={(e) => submitForm(e)}>
          <label className="
           text-gray-800 text-xl font-semibold mb-2 w-full text-left">What's your email</label>
          <input
          required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
            type="email"
            placeholder="email@example.com"
            />
          <label className=" text-xl font-semibold mb-2 w-full text-left" htmlFor="password">
            Enter Password
          </label>
          <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="password"
            className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
            />
          <button className="bg-black text-white text-xl px-4 py-2 rounded-lg w-full mb-3">
            Login
          </button>
        </form>
        <div className="mb-4 w-full text-center">
          <span className="text-gray-600">
            Join our Team{' '}
            <Link to="/captain-signup" className="text-blue-600 hover:underline">
              Create new Account
            </Link>
          </span>
        </div>
      </div>
      <div className="div flex">
        <Link to={"/user-login"} className='inline-block w-full'>
        <button className="bg-red-600 hover:bg-green-700 text-white text-lg px-4 py-2 rounded-lg w-64 mb-4">
          Sign in as User
        </button>
        </Link>
      </div>
        
    </div>
    </>
  );
}

export default Captainlogin
