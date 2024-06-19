import React, {useState} from 'react'
import './App.scss'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// Pages Import
import HomePages from './pages/HomePages'
import ChallengePages from './pages/ChallengePages'
import LeaderboardPages from './pages/LeaderboardPages'
import PrivateRoute from './components/controller/PrivateRoute'

// Token import
import useToken from './components/controller/useToken.jsx'
import AdminPages from './pages/AdminPages.jsx'

const App = () => {
  const { token, removeToken, setToken } = useToken();
  // Mengambil modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  return (
      <div>
        <BrowserRouter> 
              <Routes> 
                <Route exact path='/*' element={ <HomePages token={token} setToken={setToken} show={show} handleShow={handleShow} handleClose={handleClose}/>} />
                <Route exact path='/leaderboard' element={<LeaderboardPages token={token} setToken={setToken} show={show} handleShow={handleShow} handleClose={handleClose}/>} />
                <Route exact path='/challenge' element={<ChallengePages token={token} setToken={setToken} show={show} handleShow={handleShow} handleClose={handleClose}/>} />
                <Route exact path="/exam/:examId" element={<PrivateRoute token={token} setToken={setToken}/>} />
                <Route exact path='/admin' element={<AdminPages/>}></Route>
              </Routes>     
        </BrowserRouter>
      </div>
  )
}

export default App