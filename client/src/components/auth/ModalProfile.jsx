import React, {useState, useEffect} from 'react'
import {Col, Modal, Card, Button, Row} from 'react-bootstrap'
import User from "../../assets/user.svg"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import host from '../controller/Host'

const ModalProfile = ({profile, closeProfile, token, setToken}) => {
    // Profile Data Handler
    const [profileData, setprofileData] = useState(null)

    useEffect(() => {
        if (token && token !== "" && token !== undefined) {
            getUsers()
        }
    }, [token]);

    const username = localStorage.getItem("username");

    const getUsers = () => {
        axios({
            method: 'GET',
            url: `http://${host}/user/${username}`,
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
        .then((response) => {
            const res = response.data
            res.token && setToken(res.token)
            setprofileData(({
                profile_nama : res.nama,
                profile_username : res.username,
                profile_user_point: res.user_point
            }))
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.header)
            }
        })
    }

    // Navigate handler
    const navigate = useNavigate()

    // Profile Button handler
    const btnLogout = () => {
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
    
    return (
    
    <div>
        <Modal 
            show={profile} 
            onHide={closeProfile}
            centered        
        >
        { profileData &&
        <>
            <Card>
                <Row className='row g-0 p-3 d-flex align-items-center'>
                    <Col className=''>
                        <Card.Img src={User} />
                    </Col>
                    <Col className='col-8'>
                        <Card.Body>
                            <h5>Profiles</h5>
                            <Row className='pt-1'>
                                <Col className='col-6'>
                                    <h6>Username</h6>
                                    <p className='text-muted'>{profileData.profile_username}</p>
                                </Col>
                                <Col className='col-6'>
                                    <h6>Points</h6>
                                    <p className='text-muted'>{profileData.profile_user_point} points</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h6>Nama</h6>
                                    <p className='text-muted'>{profileData.profile_username}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </>
        }
        <Modal.Footer>
            <Button variant="outline-danger rounded rounded-0" onClick={btnLogout}>Logout</Button>
        </Modal.Footer>
        </Modal>
    </div>
)
}

export default ModalProfile
