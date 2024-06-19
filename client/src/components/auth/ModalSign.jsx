import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import '../scss/ModalSign.scss'
import FormComponent from './FormComponent';

const ModalSign = ({show, handleClose, setToken}) => {
  return (
    <div>
      <Modal 
      show={show} 
      onHide={handleClose}
      size='md'
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
        <Modal.Body className='m-3'>
          <FormComponent setToken = {setToken} handleClose={handleClose}/>
        </Modal.Body>
    </Modal>
    </div>
  )
}

export default ModalSign
