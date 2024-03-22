import React, {useState} from 'react'
import './App.scss'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// Pages Import
import HomePages from './pages/HomePages'
import ChallengePages from './pages/ChallengePages'
import LeaderboardPages from './pages/LeaderboardPages'
import Navigate from './components/layout/Navigate'
import PrivateRoute from './components/PrivateRoute'

// Token import
import useToken from './components/useToken'

const App = () => {
  const { token, removeToken, setToken } = useToken();

  // Mengambil modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
      <div>
        <BrowserRouter>
        <>
              <Navigate 
                show={show} 
                handleClose={handleClose} 
                handleShow={handleShow}
                setToken={setToken}
                token={token}
              /> 

              <Routes>
                <Route exact path='/' element={<HomePages/>} />
                <Route exact path='/leaderboard' element={<LeaderboardPages />} />
                <Route exact path='/challenge' element={<ChallengePages token={token}/>} />
                <Route exact path="/exam/:examId" element={<PrivateRoute token={token} />}
              />
              </Routes>
        </>
        </BrowserRouter>
      </div>
  )
}

export default App