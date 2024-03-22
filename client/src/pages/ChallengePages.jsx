import React, {useState} from 'react'
import ChallengeComponent from '../components/ChallengeComponent';
import toast, {Toaster} from 'react-hot-toast'


const ChallengePages = ({token}) => {
  return (
    <div className='position-relative'>
       <Toaster containerStyle={{
        top: 90,
        right: 100,
        }}></Toaster>
        <ChallengeComponent token={token}/>
    </div>
  )
}

export default ChallengePages
