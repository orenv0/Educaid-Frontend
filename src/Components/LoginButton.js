import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <button className="loginButton" onClick={() => loginWithRedirect()}><i className='fas fa-user-graduate'></i> כניסה לאיזור האישי </button>
    )
}

export default LoginButton
