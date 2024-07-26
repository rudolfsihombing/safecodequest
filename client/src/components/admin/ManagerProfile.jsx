import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Table, Pagination, Button } from 'react-bootstrap';
import axios from 'axios';
import host from '../controller/Host';
import Swal from 'sweetalert2'

// assets
import CirUser from '../../assets/user.svg'
import LadUser from '../../assets/lady-servant.svg'

const ManagerProfile = () => {
  const [userprofile, setUserprofile] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    getLeaderboard();
  }, []);

  const getLeaderboard = () => {
    axios({
      method: "GET",
      url: `http://${host}/usermanager`,
    })
    .then((response) => {
      const res = response.data.data;
      setUserprofile(res);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.header);
      }
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userprofile?.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [choose, setChoose] = useState("1");
  const handleChoose = (value) => {
    setChoose(value);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    handleChoose(user.avatar); // Menyesuaikan avatar berdasarkan data pengguna yang dipilih
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingUser({
      ...editingUser,
      [name]: value,
      "avatar": choose,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingUser.password !== editingUser.confirmPassword) {
      Swal.fire({
        title: "Warning",
        icon: "warning",
        text: "Password dan Confirm Password tidak sesuai",
      })
      return;
    } else {
        axios({
      method: "POST",
      url: `http://localhost:5000/updateUser/${editingUser.id}`,
      data: {
        id: editingUser.id,
        nama: editingUser.nama,
        username: editingUser.username,
        password: editingUser.password,
        role: editingUser.role,
        avatar: choose
      }
    }).then((res) => {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Sukses mengupdate user"
      })
    })
    }

    // Reset form setelah submit
    setEditingUser(null);
    setChoose("1");
  };

  // Delete User
  const handleDelete = (user) => {
    Swal.fire({
      title: "Peringatan",
      icon: "warning",
      text: "Anda yakin untuk menghapus?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "User berhasil di delete.",
          icon: "success"
        }).then(() => {
          axios({
            method: "POST",
            url: `http://${host}/deleteUser/${user.id}`
          }).then(() => {     
            axios({
              method: "GET",
              url: `http://${host}/usermanager`,
            })
            .then((response) => {
              const res = response.data.data;
              setUserprofile(res);
            }).catch((error) => {
              if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.header);
              }
            });
          })
        })

      }
    })

  }

  // Button Reset
  const btnReset = () => {
    setEditingUser(null)
  }

  // Button add User
  const addUser = () => {
    console.log(editingUser)
    axios({
      method: "POST",
      url: `http://${host}/adminCreate`,
      data: {
        avatar: choose,
        nama: editingUser.nama,
        username: editingUser.username,
        password: editingUser.password,
        role: editingUser.role,
      }
    }).then(() => {
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Sukses Menambahkan User"
      })

      axios({
        method: "GET",
        url: `http://${host}/usermanager`,
      })
      .then((response) => {
        const res = response.data.data;
        setUserprofile(res);
      }).catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.header);
        }
      });
      
    }).catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Username telah terdaftar"
      })
    })
  }

  return (
    <div className='bg-white rounded-2'>
      <div className='ps-5 py-4 fs-4 fw-semibold'>Admin Users Panels</div>
      <div className='ps-5 pe-5 pb-3'>
        <Table striped bordered hover className='border border-3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers?.map((user, index) => (
              <tr key={index}>
                <td className='text-body'>{user.nama}</td>
                <td className='text-body'>{user.username}</td>
                <td className='text-body'>{user.role}</td>
                <td>
                  <a href="#edit" className='link-success link-underline link-underline-opacity-0 link-underline-opacity-100-hover me-2' onClick={() => handleEdit(user)}>Edit</a>
                  <a href="#delete" className='link-danger link-underline link-underline-opacity-0 link-underline-opacity-100-hover' onClick={() => handleDelete(user)}>Delete</a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className='d-flex justify-content-center'>
          <Pagination>
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(Math.ceil(userprofile?.length / usersPerPage)).keys()].map((number) => (
              <Pagination.Item key={number} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(userprofile?.length / usersPerPage)} />
          </Pagination>
        </div>

        <Row>
          <Col className='text-dark text-center align-self-center'>
            <Row>
              {choose == 1 ? <><Col><img src={CirUser} alt='User' className='w-50'></img></Col></> : <><Col><img src={LadUser} alt='User' className='w-50'></img></Col></>}
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col>Pilih avatar</Col>
                </Row>
                <Row xs={6} className='justify-content-center mt-2'>
                  <Col><a href="#men" onClick={() => handleChoose(1)}><img src={CirUser} alt='User' className='w-100'></img></a></Col>
                  <Col><a href="#women" onClick={() => handleChoose(2)}><img src={LadUser} alt='User' className='w-100'></img></a></Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col className='text-dark py-3' xs={8}>
            <div className='fw-semibold'>Edit Area</div>
            <Form className='mt-3' onSubmit={handleSubmit}>
              <Row>
                <Col xs={7}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama Lengkap</Form.Label>
                    <Form.Control type="text" placeholder="Nama" name="nama" value={editingUser?.nama || ''} onChange={handleInputChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Roles</Form.Label>
                    <Form.Select aria-label="Default select example" name="role" value={editingUser?.role || ''} onChange={handleInputChange}>
                      <option>Pilih Roles</option>
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" name="username" value={editingUser?.username || ''} onChange={handleInputChange} />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={editingUser?.password || ''} onChange={handleInputChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" value={editingUser?.confirmPassword || ''} onChange={handleInputChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" className='me-2'>Update</Button>
              <Button variant="danger" className='me-2' onClick={() => btnReset()}>Reset</Button>
              <Button variant='warning' onClick={() => addUser()}>Add Users</Button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ManagerProfile;
