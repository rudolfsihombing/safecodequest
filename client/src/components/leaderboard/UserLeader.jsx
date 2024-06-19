import React from 'react'
import { Row, Col } from 'react-bootstrap'

const UserLeader = ({name = "Anonymous", point, i}) => {
  return (
    <Row className='border border-3 border-dark-subtle bg-warning text-dark shadow-lg'> 
        <Col>
            <h4 className='mt-2'>{i} <i className="bi bi-person-circle fst-normal"> {name}</i></h4>
        </Col>
        <Col className='mt-2 d-flex justify-content-end'>
            <h4>{point} points</h4>
        </Col>
    </Row>
  )
}

export default UserLeader
