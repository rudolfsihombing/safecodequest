import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import host from '../controller/Host';
import Swal from 'sweetalert2';

const ManagerProfile = () => {
  const [exam, setExam] = useState(null);
  const [editingExam, setEditingExam] = useState(null);

  useEffect(() => {
    getExam();
  }, []);

  const getExam = () => {
    axios({
      method: "GET",
      url: `http://${host}/adminChallenge`
    }).then((response) => {
      const res = response.data.data;
      setExam(res);
    }).catch((error) => {
      console.log(error.response);
    });
  };

  const handleEdit = (exam) => {
    setEditingExam(exam);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingExam(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const editExam = () => {
    axios({
      method: "POST",
      url: `http://${host}/updateChallenge/${editingExam?.id}`,
      data: {
        id: editingExam?.id,
        title: editingExam?.title,
        caption: editingExam?.caption,
        challenge_point: editingExam?.challenge_point,
        kode_type: editingExam?.kode_type,
        quest: editingExam?.quest,
        objektifitas: editingExam?.objektifitas,
        kode_quest: editingExam?.kode_quest,
        task_html: editingExam?.objektifitas,
        answer: editingExam?.answer
      }
    }).then((response) => {
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Sukses mengupdate challenge"
      }).then(() => {
        window.location.reload();
      })
      setEditingExam(null)
    })
  }

  const handleTambah = () => {
    axios({
      method: "POST",
      url: `http://${host}/addChallenge`,
      data: {
        id: editingExam?.id,
        title: editingExam?.title,
        caption: editingExam?.caption,
        challenge_point: editingExam?.challenge_point,
        kode_type: editingExam?.kode_type,
        quest: editingExam?.quest,
        objektifitas: editingExam?.objektifitas,
        kode_quest: editingExam?.kode_quest,
        task_html: editingExam?.objektifitas,
        answer: editingExam?.answer
      }
    }).then((response) => {
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Sukses mengupdate challenge"
      }).then(() => {
        window.location.reload();
      })
      setEditingExam(null)
    })
  }

  const handleHapus = () => {
    Swal.fire({
      title: "Peringatan",
      icon: "warning",
      text: "Kamu tidak akan dapat memulihkan challenge yang telah dihapus!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!"
    }).then((result) => {
      if(result.isConfirmed) {
        axios({
          method: "POST",
          url: `http://${host}/deleteChallenge/${editingExam?.id}`,
        }).then((response) => {
          Swal.fire({
            icon: "success",
            title: "Sukses",
            text: "Sukses menghapus challenge"
          }).then(() => {
            window.location.reload();
          })
          setEditingExam(null)
        })
      }
    })
  }

  const handleClear = () => {
    setEditingExam(null);
  };

  return (
    <div className='bg-white rounded-2'>
      <div className='ps-5 py-4 fs-4 fw-semibold'>Admin Challenge Panels</div>
      <div className='ps-5 pe-5 pb-3'>
        <Row className=''>
          <Col xs={8} className='mb-3'>
            <Form.Select aria-label="Default select example" onChange={(e) => handleEdit(JSON.parse(e.target.value))}>
              <option>Select Challenge</option>
              {exam?.map((examItem, i) => {
                return (
                  <option key={i} value={JSON.stringify(examItem)}>{examItem.title}</option>
                );
              })}
            </Form.Select>
          </Col>
          <Col>
            <Row className='text-center'>
              <Col>
                <Button variant="outline-success" className='me-3' onClick={editExam}>Edit</Button>
                <Button variant="outline-primary" className='me-3' onClick={handleHapus}>Hapus</Button>
                <Button variant="outline-danger" className='me-3' onClick={handleTambah}>Tambah</Button>
                <Button variant="outline-warning" className='me-3' onClick={handleClear}>Clear</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='mb-3'>
          <h6 className='mb-3 text-center'>Edit Area</h6>
          <Form.Group as={Col} md="3" className='mb-2'>
            <FloatingLabel label="Title">
              <Form.Control required type='text' name="title" value={editingExam?.title || ''} onChange={handleInputChange}></Form.Control>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md="3">
            <FloatingLabel label="Caption">
              <Form.Control required type='text' name="caption" value={editingExam?.caption || ''} onChange={handleInputChange}></Form.Control>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md="3">
            <FloatingLabel label="Challenge Points">
              <Form.Control required type='text' name="challenge_point" value={editingExam?.challenge_point || ''} onChange={handleInputChange}></Form.Control>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md="3">
            <FloatingLabel label="Tipe Kode">
              <Form.Control required type='text' name="kode_type" value={editingExam?.kode_type || ''} onChange={handleInputChange}></Form.Control>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} md="6" className='mb-2'>
            <FloatingLabel label="Deskripsi Challenge">
              <Form.Control required type='text' as="textarea" style={{ maxHeight: "160px", minHeight: "160px" }} name="quest" value={editingExam?.quest || ''} onChange={handleInputChange}></Form.Control>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <FloatingLabel label="Task">
              <Form.Control required type='text' as="textarea" style={{ maxHeight: "160px", minHeight: "160px" }} name="objektifitas" value={editingExam?.objektifitas || ''} onChange={handleInputChange}></Form.Control>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="6" className='mb-3'>
            <FloatingLabel label="Pseudocode Soal">
              <Form.Control required type='text' as="textarea" style={{ maxHeight: "300px", minHeight: "300px" }} name="kode_quest" value={editingExam?.kode_quest || ''} onChange={handleInputChange}></Form.Control>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <FloatingLabel label="Pseudocode Jawaban">
              <Form.Control required type='text' as="textarea" style={{ maxHeight: "300px", minHeight: "300px" }} name="answer" value={editingExam?.answer || ''} onChange={handleInputChange}></Form.Control>
            </FloatingLabel>
          </Form.Group>
        </Row>
      </div>
    </div>
  );
};

export default ManagerProfile;
