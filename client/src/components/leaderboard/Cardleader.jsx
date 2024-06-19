import React from 'react'
import { Col } from 'react-bootstrap'

// assets
import CirUser from '../../assets/user.svg'

const Cardleader = ({user, rank, points}) => {
    return (
            <Col className='bg-dark text-white text-center p-3 border border-3 border-white shadow-lg'>
                <img src={CirUser} alt='User' className='w-25 mb-2'></img>
                <h3 className='text-center'>{user}</h3>
                <h5 className='text-center'>Rank{` ${rank}`} - {` ${points}`} points</h5>
            </Col>
    )
}

export default Cardleader
