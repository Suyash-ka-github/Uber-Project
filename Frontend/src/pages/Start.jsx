import React from 'react'
import { Link } from 'react-router-dom'

function Start() {
  return (
    <div className="h-screen w-full flex flex-col">
      
      <div className="h-[80%] w-full">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png
" alt="Uber-Logo" className='absolute w-20 ml-5 mt-6' />
        <img
  src="https://images.pexels.com/photos/19015687/pexels-photo-19015687/free-photo-of-red-light-in-a-city-at-dusk.jpeg"
  alt="Uber Background"
  className="w-full h-full object-cover"
/>
      </div>

      <div className="h-[20%] flex flex-col items-center justify-center bg-gray-100">
        <h1 className='text-2xl font-semibold mb-5 '>Get Started with Uber</h1>
        <Link to="/user-login">
          <button className='bg-black text-white text-xl px-4 py-2 rounded-lg w-64'>Continue →</button>
        </Link>
      </div>
    </div>
  )
}

export default Start

