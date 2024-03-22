import React, {useState, useEffect} from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'

// Scss import
import '../scss/Navigate.scss'
import logo from '../../../scq.png'

// Pages Import
import ModalProfile from '../ModalProfile';
import ModalSign from '../ModalSign';


function Navigate({show, handleClose, handleShow, setToken, token}) {
  // Mengambil ukuran dimensi windows
const [winDim, setWinDim] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWinDim({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    };

    // Event Listener ketika jendela diresize
  window.addEventListener('resize', handleResize)

  // Membersihkan event listener pada unmount
  return () => {
    window.removeEventListener('resize', handleResize);
  }

  }, [])

  // Membuat navigasi aktif
  const location = useLocation();
  const [activePage, setActivatePage] = useState('/');

  useEffect(() => {
    setActivatePage(location.pathname);
  }, [location]);


  // HandleProfile
  const [profile, setProfile] = useState(false);

  const showProfile = () => {
    setProfile(true)
  }

  const closeProfile = () => {
    setProfile(false)
  }

return (
    <div>
    <Navbar expand="lg" className='shadow-lg bg-white p-3'>
    <Container>
        <Navbar.Brand href="/" className='p-0'>
          <img src={logo} alt="Logo" className='img-fluid w-25'/><span className='fw-semibold text-black'> SCQ </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {
        winDim.width > 992? (
            <><Navbar.Collapse id="basic-navbar-nav" className='justify-content-center gap-5'>
            <Nav.Link 
            as = {Link}
            className={`navbar nav-link-hover fw-bold ${activePage === '/' ? 'active-link' : ''}`}
            onClick={() => setActivePage('/')}
            to='/'
            >
            <i className="bi bi-house fst-normal"> Home</i>
            </Nav.Link>
            <Nav.Link 
            as = {Link}
            className={`navbar nav-link-hover fw-bold ${activePage === '/challenge' ? 'active-link' : ''}`}
            onClick={() => setActivePage('/challenge')}
            to='/challenge'>
            <i className="bi bi-grid-1x2-fill fst-normal"> Challenge</i>
            </Nav.Link>
            <Nav.Link 
            as = {Link}
            className={`navbar nav-link-hover fw-bold ${activePage === '/leaderboard' ? 'active-link' : ''}`}
            onClick={() => setActivePage('/leaderboard')}
            to='/leaderboard'
            >
              <i className="bi bi-graph-up fst-normal"> LeaderBoard</i></Nav.Link>
            </Navbar.Collapse>
            
            {token && token != "" && token !== undefined ? 
            (<Nav.Link className='navbar nav-link-hover fw-bold' onClick={showProfile}><i className="bi bi-person-circle fst-normal"> Profile</i></Nav.Link>) : 
            (<Nav.Link className='navbar nav-link-hover fw-bold' onClick={handleShow}><i className="bi bi-person-circle fst-normal"> Sign In</i></Nav.Link>)}
        </>
        ) :  <><Navbar.Collapse id="basic-navbar-nav" className='justify-content-center gap-5'>
        <Nav.Link as={Link} className='navbar nav-link-hover fw-bold mt-3 mb-3' to='/'>Home</Nav.Link>
        <Nav.Link as={Link} className='navbar nav-link-hover fw-bold mb-3' to='/challenge'>Challenge</Nav.Link>
        <Nav.Link as={Link} className='navbar nav-link-hover fw-bold mb-3' to='/leaderboard'>LeaderBoard</Nav.Link>
        {token && token != "" && token !== undefined ? 
        <><Nav.Link className='navbar nav-link-hover fw-bold mb-3' onClick={showProfile}>Profile</Nav.Link></> : 
        <><Nav.Link className='navbar nav-link-hover fw-bold mb-3' onClick={handleShow}>Sign in</Nav.Link></>}
        </Navbar.Collapse></>
        }
    </Container>
    </Navbar>
    <ModalSign show={show} handleClose={handleClose} setToken={setToken} />
    <ModalProfile profile={profile} closeProfile={closeProfile} token={token} setToken={setToken}/>
    </div>
  )
}

export default Navigate