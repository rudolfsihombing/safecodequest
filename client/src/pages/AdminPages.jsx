import React, {useState, useEffect} from 'react'
import {Col, Row} from 'react-bootstrap'
import ManagerProfile from '../components/admin/ManagerProfile'
import ManageChallenge from '../components/admin/ManagerChallenge'
import Sidebar from '../components/layout/Sidebar'
import { useNavigate } from 'react-router-dom';

const AdminPages = () => {
  const role = localStorage.getItem('Role')
  const navigate = useNavigate()
  
  useEffect(() => {
    if (role !== "Admin") {
      navigate("/")
    }
  }, [])
  
  const [menu, setMenu] = useState(true)
  
  const handleProfileMenu = () => {
    setMenu(true)
  }

  const handleChallengeMenu = () => {
    setMenu(false)
  }

  return (
    <>{role !== "Admin" ? (null) : <>
      <div>
        <Sidebar handleProfileMenu={handleProfileMenu} handleChallengeMenu={handleChallengeMenu}/>
        <Row className='justify-content-end p-5'>
        <Col className='col-9'>
            {menu ? <><ManagerProfile /></> : <><ManageChallenge /></>}
        </Col>
        </Row>
      </div>
    </>}
    </>
  )
}

export default AdminPages
