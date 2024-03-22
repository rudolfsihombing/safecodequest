import React, {useState, useEffect} from 'react'
import { Carousel, Image, Button } from 'react-bootstrap'
import './scss/LevelComponents.scss'
import jefferson from '../assets/onlinesecurity.jpg'
import { Link } from 'react-router-dom';

const LevelComponents = ({token, handleShow, notify, exam}) => { 

const checkToken = token && token !=="" && token !== undefined
const active = true

    return (
    <> 
    <Carousel fade className={`${active ? "transparent-hover" : ""}  mh-200`}>
        {exam && exam.map((exam, i) => {
            return (
                <Carousel.Item key={i}>
                <Link
                    onClick={checkToken ? () => {} : notify}
                    to={checkToken ? `/exam/${exam.id}` : '#'} 
                    className=""
                >
                    <Image src={jefferson} className={`d-block w-md-100`} style={{maxHeight : '202px' }}/>
                    <Carousel.Caption>
                            <h3>{exam.title}</h3>
                            <p>{exam.caption}</p>
                    </Carousel.Caption>
                </Link>
                </Carousel.Item>
            )
        })}
    </Carousel>
    <Button 
        size='sm' 
        variant='outline-warning'
        className='m-2 position-absolute top-0 end-0 z-1 w-25'
        onClick={handleShow}
        ><i className="bi bi-grid-fill"></i> Semua level</Button>
    </>
)
}

export default LevelComponents
