import React, {useState, useEffect} from 'react'
import ExamBody from '../components/exam/ExamBody'
import { useNavigate } from 'react-router-dom';
import Navigate from '../components/layout/Navigate';

const ExamPages = ({token, setToken, show, handleShow, handleClose}) => {
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
    <ExamBody token={token}/>
    </div>
    )
}

export default ExamPages
