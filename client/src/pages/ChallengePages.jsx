import React, {useState, useEffect} from 'react'
import ChallengeComponent from '../components/challenge/ChallengeComponent';
import Navigate from '../components/layout/Navigate';
import toast, {Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const ChallengePages = ({token, setToken, show, handleShow, handleClose}) => {
  const role = localStorage.getItem('Role')
  const navigate = useNavigate()

  useEffect(() => {
    if (role == "Admin") {
      navigate("/admin")
    }
  }, [])

  return (
    <div className='position-relative'>
          <Navigate 
          show={show} 
          handleClose={handleClose} 
          handleShow={handleShow}
          setToken={setToken}
          token={token}
        />
       <Toaster containerStyle={{
        top: 90,
        right: 100,
        }}></Toaster>
        <ChallengeComponent token={token}/>
    </div>
  )
}

export default ChallengePages
