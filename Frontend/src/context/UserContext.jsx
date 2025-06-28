import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export const UserDataContext = createContext();

function UserContext({children}) {
   
    const [user, setUser] = useState({
        fullname: {
            firstname: '',
            lastname: '' 
        },
        email: '',
})
  return (
    <div>
       <UserDataContext.Provider value={{user, setUser}}>    
        {children}
       </UserDataContext.Provider>
    
    </div>
  )
}

export default UserContext
