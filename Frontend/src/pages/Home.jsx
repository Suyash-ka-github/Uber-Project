import React, { useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehicalPanel from '../components/VehicalPanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

import 'remixicon/fonts/remixicon.css'
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [suggestion, setSuggestion] = useState([]);
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState([]);
  const [vehicleType, setVehicleType] = useState(null)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver,setWaitingForDriver]=useState(false);
  const [ride,setRide]=useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmedRideRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const navigate = useNavigate()

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)
 useEffect(() => {
  if (user) {
    socket.emit("join", { userType: "user", userId: user._id });
  }
}, [user]);

  socket.on('ride-confirmed', ride => {


    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    console.log("ride")
    setWaitingForDriver(false)
    navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
  })

  useEffect(() => {
    if (!start) return;
    fetchSuggestions(start);
  }, [start]);

  useEffect(() => {
    if (!end) return;
    fetchSuggestions(end);
  }, [end]);

  useEffect(() => {
    setVehicleFound(false);
    setConfirmRidePanel(false);
    setVehiclePanel(false);
    // ...reset other ride-related states if needed
  }, []);

  const fetchSuggestions = async (input) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: {
            input
          },
          headers: {
            Authorization: `Bearer ${token}` // Replace with actual token
          }
        }
      );
      setSuggestion(response.data);
    } catch (err) {
      console.error('Failed to fetch suggestions:', err.message);
    }
  };

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '75%',
        padding: 24
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,

      })
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      })
    }
  }, [panelOpen])


  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmedRideRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmedRideRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

      useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ waitingForDriver ])

  async function findTrip() {

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup: start, destination: end },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setVehiclePanel(true)
    setPanelOpen(false)

    console.log(response.data);

    setFare(response.data)


  }

  async function createRide() {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/create-ride`, {
      params: { pickup: start, destination: end, vehicleType },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response.data);
  }

  return (
    <div className='h-screen relative overflow-hidden'>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber-Logo"
        className="absolute w-20 ml-5 mt-6"
      />
      <div className='h-screen w-screen'>
        <img src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="map" className='h-full w-full object-cover' />
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full '>
        <div className='h-[30%] p-5 bg-white relative'>
          <div className="flex justify-between">
            <h4 className='text-2xl font-semibold inline-block -scroll '>Find a trip</h4>
            <i className="ri-arrow-down-s-line text-3xl " onClick={() => { setPanelOpen(false) }} ref={panelCloseRef}></i>
          </div>
          <form onSubmit={(e) => submitHandler(e)} className='relative'>
            <div className="line absolute h-14 w-1 left-3 rounded-full top-[32%] bg-gray-700 "></div>
            <input onClick={() => {
              setPanelOpen(true);
              setActiveField('start')
            }} value={start} onChange={(e) => { setStart(e.target.value) }} className='bg-[#bcb7b782] px-10 py-2 text-base rounded-lg w-full mt-5' type="text" placeholder='Add a pick-up location' />
            <input onClick={() => {
              setPanelOpen(true);
              setActiveField('end')
            }} value={end} onChange={(e) => { setEnd(e.target.value) }} className='bg-[#bcb7b782] px-10 py-2 text-base rounded-lg w-full mt-3' type='text' placeholder='Enter drop location' />
            <div className="flex flex-col gap-4">

            </div>
          </form>
        </div>

        <div ref={panelRef} className="bg-white h-0">
          <button onClick={findTrip}
            className="bg-black hover:bg-gray-800 text-white text-lg px-4 py-2 rounded-lg w-full mb-2"
            // onClick={handleFindTrip} // Replace with your handler
            type="button"
          >
            Find Trip
          </button>
          <LocationSearchPanel suggestion={suggestion} setStart={setStart} setEnd={setEnd} activeField={activeField} />
        </div>
        <div ref={vehiclePanelRef} className='absolute w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8 '>
          <VehicalPanel setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} fare={fare} selectVehicle={setVehicleType} />
        </div>
        <div ref={confirmedRideRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <ConfirmRide
            createRide={createRide}
            pickup={start}
            destination={end}
            fare={fare}
            vehicleType={vehicleType}
            setVehicleFound={setVehicleFound}
            setConfirmRidePanel={setConfirmRidePanel} />
        </div>
          <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12'>
        {vehicleFound && (
            <LookingForDriver
              createRide={createRide}
              pickup={start}
              destination={end}
              fare={fare}
              vehicleType={vehicleType}
              setVehicleFound={setVehicleFound}
            />
          )}
          </div>
          <div ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12'>
              {waitingForDriver && (
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver} />
               )}
            </div>
      </div>
    </div>
  )
}

export default Home
