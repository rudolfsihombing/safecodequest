import React,  { useState, useEffect }  from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import host from '../controller/Host.jsx'
import '../scss/ChallengeComponent.scss'

// import bootstrap components
import { Container, Row, Col, Card, Offcanvas } from 'react-bootstrap'


// import pages
import LevelComponents from './LevelComponents.jsx'
import LeaderChallenge from './LeaderChallenge.jsx'
import AboutChallenge from './AboutChallenge.jsx'

// import image
import johnyBriggs from '../../assets/johnybriggs.jpg'
import jezTimms from '../../assets/jeztimms.jpg'

const ChallengeComponent = ({token}) => {

    // Offcanvas handler
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

// toast handler
const notify = () => toast.error('Login untuk mengakses exam', {
    duration: 2000,
    position: 'top-right',
        style: {
            color: '#713200',
        }
    }
)

// exam state and effect
const [exam, setExam] = useState(null)
    
useEffect(() => {
    getExam()
}, [])

// exam handler
const getExam = () => {
    axios({
        method: "GET",
        url: `http://${host}/challenge`
    }).then((response) => {
        const res = response.data.data
        setExam(res)
    }).catch((error) => {
        console.log(error.response)
    })
}


const username = localStorage.getItem('username')

const [result, setResult] = useState(false)

const isCompleted = (username, challengeid) => {
    axios({
        method: 'POST',
        url: `http://${host}/checkCompletions`,
        data: {
            username: username,
            challengeid: challengeid
        }
    }).then((res) => {
        const response = res.data.data
        setResult(response)
    })

    return result
}

return (
    <div>
    <Container className='mt-5 d-flex flex-column justify-content-center gap-3'>
        <Row className='mt-2 mb-4'>
            <Col className='d-flex flex-column g-4'>
            <h3 className='text-white text-center'>Selamat datang di Challenge Pages</h3>
            <h6 className='text-white text-center'>"The past cannot be change. The future is yet in your power."</h6>
            <h6 className='text-white text-center fst-italic'>-Conficius</h6>
            </Col>
        </Row>

        <Row className='section-challenge position-relative p-5'>
            <Col className='p-4 d-flex flex-column gap-3'>
                <Row className='d-flex gap-3'>
                <Row className='col-lg bg-dark text-white text-center border border-5 border-black g-0 position-relative'>
                    <LevelComponents token={token} handleShow={handleShow} notify={notify} exam={exam} isCompleted={isCompleted}/>
                </Row>
                
                <Col className='bg-warning text-white border border-5 border-black d-flex flex-column justify-content-center'>
                    <LeaderChallenge />
                </Col>
                </Row>
                
                <Row className='h-50 gap-3'>
                
                {/* Kolom Post test */}

                <Row className='col-lg bg-dark border border-5 border-black text-white g-0 transparent-hover'>
                    <Link to='https://docs.google.com/forms/d/e/1FAIpQLSfyNSp6ic7JgtlH2iFOeKqhh8NgxLtnVrjKRLOST5sMDWB91A/viewform?usp=sf_link'>
                        <Card className="bg-dark text-white">
                        <Card.Img src={johnyBriggs} alt="Card image" className='img-fluid rounded-0'/>
                        <Card.ImgOverlay>
                            <Card.Title>
                                <h1>Pre Test</h1>
                            </Card.Title>
                        </Card.ImgOverlay>
                        </Card>
                    </Link>
                </Row>

                {/* Kolom Pre test */}

                <Row className='col-lg bg-dark border border-5 border-black text-white g-0 transparent-hover'>
                    <Link to='https://docs.google.com/forms/d/e/1FAIpQLScwPUOmG2QqtzzFVxuL_8U5Z2Jd8GqQR9JJQGf__onFVE33lA/viewform?usp=sf_link'>
                        <Card className="bg-dark text-white">
                        <Card.Img src={jezTimms} alt="Card image" className='img-fluid rounded-0'/>
                        <Card.ImgOverlay>
                            <Card.Title>
                                <h1>Post Test</h1>
                            </Card.Title>
                        </Card.ImgOverlay>
                        </Card>
                    </Link>
                </Row>


                <Col className='bg-dark text-center text-white border border-5 border-black d-flex flex-column justify-content-center'>
                    <AboutChallenge />
                </Col>
                </Row>
            </Col>
        </Row>
          {/* <h1 className='text-white'>Hello Challenge Pages</h1> */}

        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title><i className="bi bi-grid-fill"></i> Semua Level</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {exam && exam.map((exam, i) => {
                return (
                    <h5 key={i}>
                        <a 
                        href={token && token !=="" && token !== undefined ? `/exam/${exam.id}` : '#'} 
                        className={`link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover`}
                        onClick={token && token !=="" && token !== undefined ? () => {} : notify}
                        >{exam.title}</a>
                    </h5>
                )
            })}
        </Offcanvas.Body>
        </Offcanvas>

        </Container>
    </div>
)
}

export default ChallengeComponent
