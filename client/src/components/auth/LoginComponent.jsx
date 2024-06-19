import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import host from "../controller/Host"

const LoginComponent = (props) => {
    // Navigate
    const navigate = useNavigate();
    
    // Api handler
    const [loginForm, setloginForm] = useState({
        username: "",
        password: ""
    })

    const btnLogin = (event) => {
        axios({
            method: "POST",
            url: `http://${host}/login`,
            data: {
                username: loginForm.username,
                password: loginForm.password
            }
        })
        .then((response) => {
            props.setToken(response.data.access_token)
            localStorage.setItem('username', loginForm.username)
            Swal.fire({
                title: "Success",
                text: "Kamu telah melakukan Login",
                icon: "success"
            }).then(() => {
                if (response.data.role == "Admin") {
                    navigate("/admin")
                    localStorage.setItem('Role', response.data.role)
                } else {
                    navigate("/challenge")
                    localStorage.setItem('Role', response.data.role)
                }
                props.handleClose()
            })
        }).catch((error) => {
            if (error.response) {
                Swal.fire({
                    title: "Failure",
                    text: "Username atau Password Salah",
                    icon: "error"
                })
            }
        })
        event.preventDefault()
    }

    const handleChange = (event) => {
        const {value, name} = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name] : value
        }))
    }

    // Click handler
    const [isUsernameClicked, setIsUsernameClicked] = useState(false);
    const [isPwClicked, setIsPwClicked] = useState(false);
    
    const handleUsernameClick = () => {
    setIsUsernameClicked(true);
    }
    
    const handleUsernameBlur = () => {
    if (isUsernameClicked) {
        setIsUsernameClicked(false);
    }
    }

    const handlePwClick = () => {
    setIsPwClicked(true);
    }

    const handlePwBlur = () => {
    if (isPwClicked) {
        setIsPwClicked(false);
    }
    }
    
    return (
    <> <h3 className='text-center fw-bold text-dark'>
            <i className="bi bi-person-check fst-normal"> User Login</i>
            </h3>
        <Form>
        <Form.Group controlId="formBasicUsername">
            <Form.Label
                className={`fw-bold label-fade-${isUsernameClicked ? 'enter mt-3' : 'leave'}`}
            >{isUsernameClicked ? 'Username' : null}</Form.Label>
            <Form.Control 
            name="username"
            value={loginForm.username}
            text={loginForm.username}
            onChange={handleChange}
            type="Username" 
            placeholder={isUsernameClicked ? null : 'Username'}
            onClick={handleUsernameClick}
            onBlur={handleUsernameBlur}
            style={{ borderRadius: '0px', height: '50px'}}/>
        </Form.Group>

            <Form.Group controlId="formBasicPassword">
            <Form.Label
                className={`fw-bold label-fade-${isPwClicked ? 'enter mt-3' : 'leave'}`}
            >{isPwClicked ? 'Password' : null}</Form.Label>                  
            <Form.Control 
            name="password"
            value={loginForm.password}
            text={loginForm.password}
            onChange={handleChange}
            type="password" 
            placeholder={isPwClicked ? null : 'Password'}
            style={{ borderRadius: '0px', height: '50px' }}
            onClick={handlePwClick}
            onBlur={handlePwBlur}
            />
            </Form.Group>

        <div className='mt-2 d-grid col-6 mx-auto gap-2'>
            <Button 
            onClick={btnLogin}
            className="mt-3 fw-bold text-black" 
            variant="outline-warning" 
            type="submit" 
            size='md'
            style={{ borderRadius: '0px', height: '50px' }}
            >
            SIGN IN
            </Button>
            </div>

        </Form>
        </>
    )
}

export default LoginComponent
