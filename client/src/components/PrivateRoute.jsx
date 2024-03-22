import React from 'react'
import ExamPages from '../pages/ExamPages'
import ChallengePages from '../pages/ChallengePages'

const PrivateRoute = ({token}) => {

    return (
        <>       
        {token && token !=="" && token !== undefined ? <ExamPages token={token}/> : 
        <>
            <ChallengePages />
            {window.location.href="/challenge"}
        </>
        }
        </>
    )
}

export default PrivateRoute