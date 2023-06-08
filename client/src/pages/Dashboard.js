import React, {useEffect} from 'react'
import {useAuth} from '../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth()

  return (
    <div></div>
  )
}

export default Dashboard