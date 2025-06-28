import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

function CaptainSignup() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);
 
  const submitForm = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        color:vehicleColor,
        plate:vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType,
      }
      
    };
    console.log(newCaptain);
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain)
    if (response.status === 201) {
      const data = response.data
      localStorage.setItem('token',data.token);
      setCaptain(data.captain);
      navigate('/captain-home');
    }
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('car');
  };

  return (
    <>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber-Logo"
        className="absolute w-20 ml-5 mt-6"
      />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-8 flex flex-col items-center w-80 mb-10 mt-10">
          <form className="flex flex-col w-full" onSubmit={submitForm}>
            <label className="text-gray-800 text-xl font-semibold mb-2 w-full text-left">
              What's our Captain's name
            </label>
            <div className="flex gap-2 mb-4 flex-col sm:flex-row">
              <input
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2"
                type="text"
                placeholder="First name"
              />
              <input
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2"
                type="text"
                placeholder="Last name"
              />
            </div>
            <label className="text-gray-800 text-xl font-semibold mb-2 w-full text-left">
              What's our Captain's email
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

            <label className="text-gray-800 text-xl font-semibold mb-2 w-full text-left">
              Vehicle Information
            </label>
            {/* Vehicle Color & Plate */}
            <div className="flex gap-2 mb-4 flex-col sm:flex-row">
              <input
                required
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2"
                type="text"
                placeholder="Vehicle Color"
              />
              <input
                required
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2"
                type="text"
                placeholder="Vehicle Plate"
              />
            </div>
            {/* Capacity & Type */}
            <div className="flex gap-2 mb-6 flex-col sm:flex-row">
              <input
                required
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2"
                type="number"
                min="1"
                placeholder="Capacity"
              />
              <select
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2"
              >
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="auto">AutoRikshaw</option>
              </select>
            </div>
            <button onClick={(e)=>submitForm(e)} className="bg-black text-white text-xl px-4 py-2 rounded-lg w-full mb-3">
              Create Captain Account
            </button>
          </form>
          <div className="mb-4 w-full text-center">
            <span className="text-gray-600 text-sm">
              Already have a account?{' '}
              <Link to="/captain-login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="https://policies.google.com/terms" className="underline" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.
          </p>
        </div>
      </div>
    </>
  );
}

export default CaptainSignup;
