import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useFormik } from 'formik'
import host from "./Host"

const RegisterComponent = ({handleClose}) => {
    // Formik handler
    const initialValues = {
        nama: '',
        username: '',
        password: '',
    }
    
    const onSubmit = values => {
        console.log('Form data', values)
    }

    const validate = values => {
        let errors = {}

            if (!values.nama) {
                errors.nama = 'Required'
            }

            if (!values.username) {
                errors.username = 'Required'
            }

            if (!values.password) {
                errors.password = 'Required'
            }
            
            console.log(errors)
            return errors
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })
    
    // Navigate handler
    const navigate = useNavigate();

    // Api handler
    const btnRegister = (event) => {
        const errorsNotEmpty = Object.keys(formik.errors).length > 0;

        if (!errorsNotEmpty) {
            axios({
                method: "POST",
                url: `http://${host}/signup`,
                data: {
                    nama: formik.values.nama,
                    username: formik.values.username,
                    password: formik.values.password,
                }
            })
            .then(() => {
                Swal.fire({
                    title: "Success",
                    text: "Kamu telah Terdaftar",
                    icon: "success"
                }).then(() => {
                    navigate("/challenge")
                    handleClose() 
                })
            }).catch((error) => {
                if (error.response) {
                    alert("Invalid Credentials")
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
            event.preventDefault()
        } else {
            Swal.fire({
                title: "Failure",
                text: "Silakan isi required field",
                icon: "error"
            })
        }
    }

    // Field handler
    const [isUsernameClicked, setIsUsernameClicked] = useState(false);
    const [isPwClicked, setIsPwClicked] = useState(false);
    const [isNickClicked, setIsNickClicked] = useState(false);
    
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

    const handleNickClick = () => {
        setIsNickClicked(true);
    }

    const handleNickBlur = () => {
        if (isNickClicked) {
        setIsNickClicked(false);
        }
    }
    
    return (
    <>    
        {/* Form untuk Register */}
        <h3 className='text-center fw-bold text-dark'><i className="bi bi-person-add fst-normal"> Register User</i></h3>
        <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label
                    className={`fw-bold label-fade-${isNickClicked ? 'enter mt-3' : 'leave'}`}
                >{isNickClicked ? 'Nama Lengkap' : null}</Form.Label>                  
                <Form.Control 
                type="text" 
                placeholder={isNickClicked ? null : 'Nama Lengkap'}
                style={{ borderRadius: '0px', height: '50px' }}
                onClick={handleNickClick}
                onBlur={handleNickBlur}
                name="nama"
                onChange={formik.handleChange}
                value={formik.values.nama}
                isValid={formik.touched.nama && !formik.errors.nama}
                isInvalid={!!formik.errors.nama}
                />
                <Form.Control.Feedback >Looks Good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{formik.errors.nama}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicUsername">
                <Form.Label
                    className={`fw-bold label-fade-${isUsernameClicked ? 'enter mt-3' : 'leave'}`}
                >{isUsernameClicked ? 'Username' : null}</Form.Label>
                <Form.Control 
                type="text" 
                placeholder={isUsernameClicked ? null : 'Username'}
                onClick={handleUsernameClick}
                onBlur={handleUsernameBlur}
                style={{ borderRadius: '0px', height: '50px'}}
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                isValid={formik.touched.nama && !formik.errors.username}
                isInvalid={!!formik.errors.username}
                />
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label
                    className={`fw-bold label-fade-${isPwClicked ? 'enter mt-3' : 'leave'}`}
                >{isPwClicked ? 'Password' : null}</Form.Label>                  
                <Form.Control 
                type="password" 
                placeholder={isPwClicked ? null : 'Password'}
                style={{ borderRadius: '0px', height: '50px' }}
                onClick={handlePwClick}
                onBlur={handlePwBlur}
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                isValid={formik.touched.nama && !formik.errors.password}
                isInvalid={!!formik.errors.password}
                />
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
            </Form.Group>
            

        <div className='mt-2 d-grid col-6 mx-auto gap-2'>
            <Button 
            className="mt-3 fw-bold text-black" 
            variant="outline-warning" 
            type="submit" 
            size='md'
            style={{ borderRadius: '0px', height: '50px' }}
            onClick={btnRegister}
            >
            SIGN UP
            </Button>
            </div>
        </Form>
        </>
    )
}

export default RegisterComponent
