import React, {useState, useEffect} from 'react'
import RegisterComponent from './RegisterComponent';
import LoginComponent from './LoginComponent';

const FormComponent = ({setToken, handleClose}) => {
    const [isUnRegistered, setUnIsRegistered] = useState(false);
    
    const handleUnregisted = () => {
        setUnIsRegistered(true);
    }

    const handleRegistered = () => {
        setUnIsRegistered(false)
    }
    
    return (
    <div>
        <>{isUnRegistered 
        ? 
        
        (
            <><RegisterComponent handleClose={handleClose}/>
                <a 
                    className='link-primary mt-3 d-flex justify-content-center link-opacity-50-hover link-underline link-underline-opacity-0' 
                    href='#'
                    onClick={handleRegistered}
                    >Sudah mempunyai akun?
                </a>
            </>
        ) 
            
        // End form untuk register User

        // Form untuk Login User
        : 
        
        (
            <><LoginComponent setToken = {setToken} handleClose={handleClose}/>
                <a 
                    className='link-primary mt-3 d-flex justify-content-center link-opacity-50-hover link-underline link-underline-opacity-0' 
                    href='#'
                    onClick={handleUnregisted}
                    >Belum punya akun?
                </a>
            </>
        )}
        
        </>
        </div>
    )
}

export default FormComponent
