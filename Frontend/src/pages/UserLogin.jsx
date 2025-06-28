import React from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useContext } from 'react';
import axios from 'axios';


function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserDataContext);

  const submitForm =async (e) => {
    e.preventDefault();
    const userData={
      email,
      password,
    }
    
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
    if (response.status === 200) { 
      const data=response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token); // Store user data in localStorage
      navigate('/home'); 
    } else {
      console.error('Login failed:', response.data);  
    }
    navigate('/home');
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
          <span className="text-gray-600 text-sm">
            New here?{' '}
            <Link to="/user-signup" className="text-blue-600 hover:underline">
              Create new Account
            </Link>
          </span>
        </div>
      </div>
      <div className="div flex">
        <Link to={"/captain-login"} className='inline-block w-full'>
        <button className="bg-green-600 hover:bg-green-700 text-white text-lg px-4 py-2 rounded-lg w-64 mb-4">
          Sign in as Captain
        </button>
        </Link>
      </div>
        
    </div>
    </>
  );
}


export default UserLogin;
