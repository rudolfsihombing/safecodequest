import React, {useState} from 'react'
import { Toast, Button, Modal, Container } from 'react-bootstrap'
import axios from 'axios'
import { Parser } from "html-to-react"

const QuestionBody = ({quest, objektivitas, point, title, user_point, username, exam, task_html}) => {
    // toast controller 
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    // reset level
    const resetLevel = () => {
        window.location.reload()
    }

    // Get help
    const [text, setText] = useState("")

    const getHelp = () => {
        axios({
            method: "POST",
            url: "http://localhost:5000/helpgpt",
            data: {
                objektif: exam?.exam_objektivitas,
                message : exam?.exam_kode_quest
            }
        }).then((response) => {
            const result = response.data.text
            setText(result)
        })
    }

    // Show help
    const [show, setShow] = useState(false);
    const handleHelp = () => setShow(!show)

    return (
            <> 
            <Button size='sm' variant="outline-secondary" onClick={toggleShowA} className='mb-2 rounded-0 text-white border border-2 border-light me-2'><i className="bi bi-person-circle fst-normal"> {username}</i></Button>
            <Button size='sm' className='mb-2 bg-dark rounded-0 text-light border border-2 border-light me-2' disabled><i className="bi bi-alexa fst-normal"> {title}</i></Button>
            <Button size='sm' className='mb-2 bg-dark rounded-0 text-light border border-2 border-light' disabled><i className="bi bi-droplet-fill fst-normal">{point} Points</i></Button>
            
            <Toast show={showA} onClose={toggleShowA} className='rounded-0 w-100'>
                <Toast.Body className='bg-light text-black border border-2 border-white'>
                <i className="text-success bi bi-fire fst-normal"> Your score is {user_point} points</i>
                </Toast.Body>
            </Toast>
                
            {/* Mission Workflow */}
            <div className='mt-2 text-justify bg-light text-dark p-4 mb-3'>{quest}</div>

            {/* Button Controls */}
            <div className='d-flex justify-content-center'>

            <Button variant="outline-secondary" size='sm' className='mb-2 rounded-0 text-white border border-2 border-light me-2' onClick={resetLevel}>Reset This Level</Button>
            <Button variant="outline-secondary" size='sm' className='mb-2 rounded-0 text-white border border-2 border-light me-2' onClick={() => {
                handleHelp();
                getHelp();
            }}>Get Help</Button>

            </div>

            {/* Objectives */}
            <div className='mt-2 text-justify bg-light text-dark p-4 mb-3'>Objektifitas : <br/><br/> {Parser().parse(task_html)} </div>
            
            <Container fluid>
                <Modal show={show} onHide={handleHelp} centered>
                    <Modal.Header closeButton>
                    <Modal.Title>Hints</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{text}</Modal.Body>
                </Modal>
            </Container>
            </>
    )
}

export default QuestionBody
