import React, {useState, useEffect} from 'react'
import LeaderboardBody from '../components/leaderboard/LeaderboardBody'
import Navigate from '../components/layout/Navigate'
import { useNavigate } from 'react-router-dom';

const LeaderboardPages = ({token, setToken, show, handleShow, handleClose}) => {
  const role = localStorage.getItem('Role')
  const navigate = useNavigate()

  useEffect(() => {
    if (role == "Admin") {
      navigate("/admin")
    }
  }, [])
  
  return (
    <div>
        <Navigate 
          show={show} 
          handleClose={handleClose} 
          handleShow={handleShow}
          setToken={setToken}
          token={token}
        />
        <LeaderboardBody />
    </div>
  )
}

export default LeaderboardPages
