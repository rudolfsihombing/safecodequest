import React from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import '../scss/HomeBody.scss'
import { useNavigate } from 'react-router-dom'

// Typewriter effect
import { useTypewriter, Cursor } from 'react-simple-typewriter'

// Pictures
import firewall from '../../assets/tsv.png'

// Typewriter effect controller
const HomeBody = () => {
  const [text] = useTypewriter({
    words: ['di SafeCodeQuest Developers !'],
    typeSpeed: 65,
    deleteSpeed: 65,
    loop: {}
  })

// Navigation controller
const navigate = useNavigate()

const handleMulai = () => {
  navigate('/challenge')
}


  return (
    <div>
    <Container className='section'>
      <Row className='d-flex justify-content-center'>
        <Row className='col-lg d-flex flex-column justify-content-center'>
          <h1 className='text-white fs-custom-1 fw-bold mb-3 text-center'>Selamat Datang</h1>
          <h2 className='text-white fw-bold mb-3 text-center'>{text}<Cursor /></h2>
          <h6 className='text-white mb-3 text-center'>Game Secure Code berbasis OWASP secure practices code bertujuan untuk meningkatkan skill para developers</h6>
          <div className='mt-4 d-flex justify-content-center'>
            <Button variant='outline-warning' className='shadow p-3 fw-bold border border-3 text-white' onClick={handleMulai}>M U L A I</Button>
          </div>
        </Row>
        <Row className='col-lg'>
          <img src={firewall} className='ms-3' />
        </Row>
      </Row>
    </Container>
  </div>
  )
}

export default HomeBody