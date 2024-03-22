import React, {useState, useEffect, useRef} from 'react'
import { Row, Col, Container, Nav, Button } from 'react-bootstrap'
import './scss/ExamBody.scss'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

// Editor
import Editor from "@monaco-editor/react"

// Body
import QuestionBody from './QuestionBody'

const ExamBody = ({token}) => {
     // useEffect
    useEffect(() => {
        checkcompleted()
        getExam()
        getUsers()
    }, [])

     // useParams
    const { examId } = useParams();

    // exam state and effect
    const [exam, setExam] = useState(null)

    // fetch challenge
    const getExam = () => {
        axios({
            method: "GET",
            url: `http://127.0.0.1:5000/challenge/${examId}`,
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }).then((response) => {
            const res = response.data
            setExam(({
                exam_title : res.title,
                exam_point : res.challenge_point,
                exam_quest : res.quest,
                exam_objektivitas : res.objektifitas,
                exam_answer : res.answer,
                exam_kode_quest : res.kode_quest,
                exam_kode_type : res.kode_type,
                exam_task_html : res.task_html
            }))
            console.log(res)
        }).catch((error) => {
            console.log(error.response)
        })
    }

    // Profile Data Handler
    const [profileData, setprofileData] = useState(null)
    
    const username = localStorage.getItem("username");
    
    const getUsers = () => {
        axios({
            method: 'GET',
            url: `http://127.0.0.1:5000/user/${username}`,
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
    
    // navigate
    const navigate = useNavigate()
    
    // give up button
    const giveUp = () => {
        Swal.fire({
            title: "Yakin?",
            text: "Kamu akan diarahkan ke laman challenge",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, saya menyerah"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/challenge")
            }
        })
    }

    // adding point
    const addPoint = () => {
        axios.put(`http://localhost:5000/userupdate/${username}`, {
            point: exam?.exam_point
        })
    }
    
    // completed
    const completed = () => {
        axios({
            method: "POST",
            url: "http://localhost:5000/addcompletions",
            data: {
                username: username,
                challengeid: examId
            }
        })
    }

    // completed toast
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    // check completed
    const [selesai, setSelesai] = useState(false)

    const checkcompleted = () => {
        axios({
            method: "POST",
            url: "http://localhost:5000/checkCompletions",
            data: {
                username: username,
                challengeid: examId
            }
        }).then((res) => {
            const hasComplete = res.data.data
            if (hasComplete) {
                Toast.fire({
                    icon: "success",
                    title: "Task ini telah selesai. Anda tidak dapat mengerjakan ulang level ini."
                });
                setSelesai(true)
            }
        })
    }
    
     // Editor value
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    const getEditorValue = () => {
        const userAnswer = editorRef.current.getValue()
        
        if (!selesai) {
            console.log(userAnswer)

            // Check the answer
            const checkAnswer = () => {
                axios({
                    method: "POST",
                    url: "http://localhost:5000/checkgpt",
                    data: {
                        objektif: exam?.exam_objektivitas,
                        kunci: exam?.exam_answer,
                        message: userAnswer
                    }
                }).then(response => {
                    console.log(response.data)
                    if (response.data) {
                        Swal.fire({
                            title: "Nice Job",
                            text: `Anda mendapatkan ${exam?.exam_point} poin`,
                            icon: 'success'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                addPoint()
                                completed()
                                navigate("/challenge")
                            }
                        })
                    } else {
                        Swal.fire({
                            title: "Belum tepat",
                            text: "Jawaban anda masih belum tepat",
                            icon: "error"
                        })
                    }
                })
            }

            checkAnswer()
        } else {
                Swal.fire({
                    title: "Sudah selesai",
                    text: "Level ini telah selesai. Anda tidak dapat mengerjakan level sebanyak dua kali, silakan untuk melihat solusi atau kembali ke laman challenge",
                    icon: 'warning',
                    confirmButtonText: "Laman Challenge",
                    showCancelButton: true,
                    cancelButtonText: "Cancel"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/challenge")
                    }
                })
        }
    }

    return (
    <div className='p-5'>
        <Container fluid="md">
            <Row className='mb-3 border border-3 border-white'>
                <Col className='bg-dark text-white text-center fw-bold'>{exam?.exam_title}</Col>
                <Col className='bg-warning text-black text-center fw-bold'>Secure Coding</Col>
            </Row>
            
            <Row className='text-white gap-2 d-flex flex-column flex-md-row' >
            <Col className='bg-dark border border-white border-3 p-3' style={{ height: '40.4rem', overflowY: 'auto', maxHeight: '40.4rem' }}>
                <Nav variant="tabs" defaultActiveKey="#" className='mb-3 border border-0 justify-content-center'>
                    <Nav.Item>
                        <Nav.Link href="#" className='text-warning'>Question</Nav.Link>
                    </Nav.Item>
                </Nav>
                
                <QuestionBody 
                    quest={exam?.exam_quest} 
                    objektivitas={exam?.exam_objektivitas} 
                    point = {exam?.exam_point} 
                    title = {exam?.exam_title} 
                    user_point = {profileData?.profile_user_point} 
                    username = {profileData?.profile_username}
                    exam = {exam}
                    task_html = {exam?.exam_task_html}
                    />
            </Col>

                <Col className='bg-dark border border-white border-3 g-0 position-relative' style={{ height: '40.4rem', overflowY: 'auto', maxHeight: '40.4rem' }}>
                    <Editor 
                        theme='vs-dark'
                        defaultLanguage={exam?.exam_kode_type}
                        defaultValue={exam?.exam_kode_quest}
                        onMount={handleEditorDidMount}
                    />
                    <div className='position-absolute bottom-0 start-50 translate-middle-x mb-3 py-2 d-flex justify-content-end pe-2 transparent-background gap-2' style={{width: '95%'}}> 
                        <Button variant='outline-dark' size='sm' className='border border-1 border-white rounded-0 fw-bold text-light' onClick={getEditorValue}>Attempts</Button>
                        <Button variant='outline-dark' size='sm' className='border border-1 border-white rounded-0 fw-bold text-light' onClick={giveUp}>Give Up</Button>
                    </div>
                </Col>
            </Row>
        </Container>

    </div>
)
}

export default ExamBody
