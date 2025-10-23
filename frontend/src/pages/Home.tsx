import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div className='p-5'>
      <div>Home</div>
      <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={handleLogout}>logout</button>
    </div>
    
  )
}
