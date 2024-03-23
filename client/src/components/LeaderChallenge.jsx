import React, {useState, useEffect} from 'react'
import axios from 'axios'
import host from './Host'

const LeaderChallenge = () => {
    // leader fetch
    const [leaderboard, setLeaderboard] = useState(null)
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
    
    useEffect(() => {
        getLeaderboard()
    }, [])

    return (
    <div className='text-black p-2'>
        <h4 className='text-center'>
            <i className="text-white bi bi-star-fill fst-normal">
            </i><i className="text-white bi bi-star-fill fst-normal">
            </i><i className="text-white bi bi-star-fill fst-normal">
            <p>The Master</p>
        </i></h4>
        
        {
            leaderboard?.map((user, i) => {
                if (i < 1) {
                    return (
                        <h6 key={i}>{user.username} telah berhasil mengumpulkan sebanyak {user.user_point} point berdasarkan akumulasi point setiap level. Selamat!🎉🎉🎉</h6>
                    )
                }
            })
        }
        
        <p className='text-center'>Last updated 3 mins ago</p>
    </div>
)
}

export default LeaderChallenge
