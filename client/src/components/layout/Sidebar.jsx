import React, {useState} from 'react'
import { Badge, Offcanvas, ListGroup, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import host from '../controller/Host'

const Sidebar = ({handleProfileMenu, handleChallengeMenu}) => {
    const handleLogout = () => {
        Swal.fire({
            icon: "warning",
            title: "Logout",
            text: "Anda yakin akan melakukan logout?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, keluar!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios({
                    method: "POST",
                    url: `http://${host}/logout`,
                }).then(() => {
                    localStorage.removeItem("username")
                    localStorage.removeItem("token")
                    localStorage.removeItem("Role")
                    Swal.fire({
                        title: "Success",
                        text: "Kamu telah Logout",
                        icon: "success"
                    }).then(() => {
                        window.location.href = "/"
                    })
                }).catch((error) => {
                    if (error.response) {
                        console.log(response)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                    }
                })
            }
        })
    }
    
    return (
        <>
        <Offcanvas show={true} backdrop={false} enforceFocus={false} >
        <Offcanvas.Header className="d-flex flex-column align-items-center">
          <Offcanvas.Title className="sidebar-header">Admin Pages</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ListGroup defaultActiveKey="#profile">
            <ListGroup.Item action href="#profile"
                className="d-flex justify-content-between align-items-center"
                onClick={handleProfileMenu}
            >
                <div className="ms-2 me-auto">
                <div className="fw-bold">Manage User</div>
                User can be managed here
                </div>
                <Badge bg="primary" pills="true">
                <i className="bi bi-person-circle"></i>
                </Badge>
            </ListGroup.Item>
            <ListGroup.Item action href='#challenge'
                className="d-flex justify-content-between align-items-center"
                onClick={handleChallengeMenu}
            >
                <div className="ms-2 me-auto">
                <div className="fw-bold">Manage Challenge</div>
                Challenge can be managed here
                </div>
                <Badge bg="primary" pills="true">
                <i className="bi bi-controller"></i>
                </Badge>
            </ListGroup.Item>
            <ListGroup.Item action href="#logout" onClick={handleLogout}
                 className="d-flex justify-content-between align-items-center"
            >
                <div className="ms-2 me-auto">
                <div className="fw-bold">Logout</div>
                Use to logout
                </div>
                <Badge bg="primary" pills="true">
                <i class="bi bi-box-arrow-right"></i>
                </Badge>
            </ListGroup.Item>
        </ListGroup>

        </Offcanvas.Body>
      </Offcanvas>
      </>
  )
}

export default Sidebar
