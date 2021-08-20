import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserDetails = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    if (isLoading) {
        return <div className="user-details">
            <h2>!ברוך הבא לאזור האישי</h2>
            <h3>...טוען דף</h3>
            <div className="loader"></div>
            <br />
            <br />



        </div>

    } else {
        return (
            isAuthenticated && (

                <div>
                    <h2>!ברוך הבא לאזור האישי</h2>

                    <img src={user.picture} alt={user.name} width="100" height="100" />
                    <h3>{user.name}</h3>


                </div>

            )
        )

    }

}

export default UserDetails
