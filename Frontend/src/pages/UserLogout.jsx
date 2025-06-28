import React from 'react'
import axious from 'axios'
import { useNavigate } from 'react-router-dom'
const UserLogout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    axious.get(`${import.meta.env.VITE_API_URL}/user/logout`, {
        headers: {  
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => {   
        if (response.status === 200) {
            localStorage.removeItem('token'); // Clear the token from localStorage
            navigate('/user-login'); // Redirect to user login page
        } else {
            console.error('Logout failed:', response.data);
        }
    })
    .catch((error) => { 
        console.error('Error during logout:', error);
    });
  return (
    <div>
      
    </div>
  )
}

export default UserLogout
