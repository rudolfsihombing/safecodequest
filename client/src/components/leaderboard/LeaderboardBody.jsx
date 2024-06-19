import React, { useEffect, useState } from 'react'
import {Container, Row} from 'react-bootstrap'
import Cardleader from './Cardleader.jsx'
import UserLeader from './UserLeader.jsx'
import axios from 'axios'
import host from "../controller/Host.jsx"

const LeaderboardBody = () => {
  const [leaderboard, setLeaderboard] = useState(null)
  
  useEffect(() => {
    getLeaderboard()
  }, [])
  
  const getLeaderboard = () => {
    axios({
      method: "GET",
      url: `http://${host}/leaderboard`,
    })
    .then((response) => {
      const res = response.data.data
      setLeaderboard(res);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.header)
      }
    })
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center p-4">
    <Row className='mt-5 d-flex gap-3'>
    {
      leaderboard?.map((user, i) => {
        if (i <=2) {
          return (
            <Cardleader user = {user.username} rank={i+1} points={user.user_point} key={i} />
          )
        } else {
          return null
        }
      })
    }

    </Row>
    
    <Row className='bg-light text-white mt-5 w-md-50 p-5 d-flex gap-3 justify-content-center border border-3 border-black' style={{ overflowY: 'auto', maxHeight: '400px' }}>
      <h1 className='text-center text-dark'><i className="bi bi-graph-up fst-normal"> LeaderBoard</i></h1>
        {
          leaderboard?.map((user, i) => {
            return (
              <UserLeader name={user.username} point={user.user_point} i={i+1} key={i} />
            )
          })
        }
    </Row>
  </Container>
  )
}

export default LeaderboardBody
